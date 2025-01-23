import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import {
	S3Client,
	S3ServiceException,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import Cookies from "js-cookie";

import {
	S3_BUCKET,
	S3_TEMP_BUCKET,
	REGION,
	AWS_IDENTITY_POOL_ID,
} from "./utils/config";

import "./App.css";
import CustomerSide from "./components/CustomerSide/CustomerSide";
import OwnerSide from "./components/OwnerSide";

const App = () => {
	const client = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: REGION },
			identityPoolId: AWS_IDENTITY_POOL_ID,
		}),
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const redirect_status = searchParams.get("redirect_status");

	const [pricelist, setPricelist] = useState(null);
	const handlePricelistChange = (newPricelist, token) => {
		axios
			.put(
				`http://localhost:3001/api/pricelist/${newPricelist["id"]}`,
				newPricelist,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((result) => {
				axios.get("http://localhost:3001/api/pricelist").then((result) => {
					setPricelist(result["data"][0]);
				});
			});
	};

	const [order, setOrder] = useState(
		Cookies.get("order")
			? JSON.parse(Cookies.get("order"))
			: {
					items: [],
					deliveryType: "Abholen",
					deliveryAddress: {
						firstName: "",
						surname: "",
						mobile: "",
						email: "",
						street: "",
						houseNumber: "",
						ZIPCode: "",
						city: "",
					},
					orderNumber: "",
			  }
	);
	const orderRef = useRef({ current: order });
	orderRef.current = order;

	const addItem = (newItem) => {
		const newItems = orderRef.current["items"].concat([newItem]);
		setOrder({ ...orderRef.current, items: newItems });

		const reader = new FileReader();
		reader.readAsArrayBuffer(newItem.file);
		reader.onload = (e) => {
			console.log("DataURL:", e.target.result);
			let command = new PutObjectCommand({
				Bucket: S3_TEMP_BUCKET,
				Body: e.target.result,
				Key: newItem.S3TempName,
			});

			try {
				const response = client.send(command);
				console.log(response);
			} catch (caught) {
				if (
					caught instanceof S3ServiceException &&
					caught.name === "EntityTooLarge"
				) {
					console.error(
						`Error from S3 while uploading object to ${S3_TEMP_BUCKET}. \
                The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
                or the multipart upload API (5TB max).`
					);
				} else if (caught instanceof S3ServiceException) {
					console.error(
						`Error from S3 while uploading object to ${S3_TEMP_BUCKET}.  ${caught.name}: ${caught.message}`
					);
				} else {
					throw caught;
				}
			}
		};
	};

	const changeAmount = (index, newAmount) => {
		if (
			isNaN(newAmount) ||
			parseInt(Number(newAmount)) != newAmount ||
			isNaN(parseInt(newAmount, 10))
		) {
			orderRef.current["items"][index]["amount"] = "";
			setOrder({ ...orderRef.current });
		} else if (newAmount == 0) {
			orderRef.current["items"][index]["amount"] = 1;
			setOrder({ ...orderRef.current });
		} else {
			orderRef.current["items"][index]["amount"] = newAmount;
			setOrder({ ...orderRef.current });
		}
	};

	const deleteItem = (index) => {
		const newItems = orderRef.current["items"]
			.slice(0, index)
			.concat(orderRef.current["items"].slice(index + 1));
		setOrder({ ...orderRef.current, items: newItems });
	};

	const changeDeliveryType = (newType) => {
		setOrder({ ...orderRef.current, deliveryType: newType });
	};

	const changeDeliveryAddress = (key, value) => {
		const newDeliveryAddress = { ...orderRef.current["deliveryAddress"] };
		newDeliveryAddress[key] = value;
		setOrder({ ...orderRef.current, deliveryAddress: newDeliveryAddress });
	};

	const changeOrderNumber = () => {
		const addition = Date.now().toString();
		const newOrderNumber = !orderRef.current["orderNumber"]
			? addition
			: orderRef.current["orderNumber"] + "-" + addition;
		setOrder({ ...orderRef.current, orderNumber: newOrderNumber });
	};

	const uploadImages = async () => {
		if (client) {
			const images = order["items"].map((item) => item.file);

			for (const image of images) {
				const reader = new FileReader();
				reader.readAsArrayBuffer(image);
				reader.onload = (e) => {
					console.log("DataURL:", e.target.result);
					let command = new PutObjectCommand({
						Bucket: S3_BUCKET,
						Body: e.target.result,
						Key: image.name,
					});

					try {
						const response = client.send(command);
						console.log(response);
					} catch (caught) {
						if (
							caught instanceof S3ServiceException &&
							caught.name === "EntityTooLarge"
						) {
							console.error(
								`Error from S3 while uploading object to ${S3_BUCKET}. \
                The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
                or the multipart upload API (5TB max).`
							);
						} else if (caught instanceof S3ServiceException) {
							console.error(
								`Error from S3 while uploading object to ${S3_BUCKET}.  ${caught.name}: ${caught.message}`
							);
						} else {
							throw caught;
						}
					}
				};
			}
		}
	};

	const loadCookies = () => {
		if (Cookies.get("order")) {
			console.log("cookies used");
			setOrder(JSON.parse(Cookies.get("order")));
		}
		console.log("load cookies");
	};
	const updateCookies = () => {
		console.log("orderRef.current[items]: ", orderRef.current["items"]);
		const cookiesOrder = {
			...orderRef.current,
			items: orderRef.current["items"].map((item) =>
				Object({
					file: { name: item.file ? item.file.name : item.name },
					supertype: item.supertype,
					product: item.product,
					type: item.type,
					amount: item.amount,
					S3TempName: item.S3TempName,
				})
			),
		};

		Cookies.set("order", JSON.stringify(cookiesOrder));
		console.log("update cookies");
	};

	useEffect(() => {
		axios.get("http://localhost:3001/api/pricelist").then((result) => {
			setPricelist(result["data"][0]);
		});
		//loadCookies();
	}, []);

	useEffect(() => {
		updateCookies();
	}, [order]);

	if (pricelist) {
		return (
			<Routes>
				<Route
					path="/"
					element={
						<CustomerSide
							order={order}
							pricelist={pricelist}
							addItem={addItem}
							deleteItem={deleteItem}
							changeOrderNumber={changeOrderNumber}
							changeAmount={changeAmount}
							changeDeliveryAddress={changeDeliveryAddress}
							changeDeliveryType={changeDeliveryType}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<OwnerSide
							pricelist={pricelist}
							handlePricelistChange={handlePricelistChange}
						/>
					}
				/>
				<Route
					path="/after_payment_attempt"
					element={
						<CustomerSide
							order={order}
							orderSuccess={redirect_status}
							pricelist={pricelist}
							addItem={addItem}
							deleteItem={deleteItem}
							changeOrderNumber={() => changeOrderNumber()}
							changeAmount={changeAmount}
							changeDeliveryAddress={changeDeliveryAddress}
							changeDeliveryType={changeDeliveryType}
						/>
					}
				/>
			</Routes>
		);
	} else return <></>;
};

export default App;
