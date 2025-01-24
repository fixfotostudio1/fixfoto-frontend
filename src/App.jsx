import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import {
	S3Client,
	S3ServiceException,
	DeleteObjectsCommand,
	GetObjectCommand,
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
			uploadImage(e.target.result, newItem.S3TempName, S3_TEMP_BUCKET);
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
		console.log("deleteItem");
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

	const changeOrderNumber = (newOrderNumber) => {
		console.log("changeOrderNumber");
		setOrder({ ...orderRef.current, orderNumber: newOrderNumber });
	};

	const uploadImages = async () => {
		console.log("uploadImages");
		if (client) {
			const imageS3TempNames = order["items"].map((item) => item.S3TempName);

			for (const imageName of imageS3TempNames) {
				const response = await client.send(
					new GetObjectCommand({
						Bucket: S3_TEMP_BUCKET,
						Key: imageName,
					})
				);
				// The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
				const byteArr = await response.Body.transformToByteArray();
				uploadImage(byteArr, order.orderNumber + "-" + imageName, S3_BUCKET);
			}
		}
	};

	const uploadImage = (imageAsByteArray, S3Name, bucketName) => {
		let command = new PutObjectCommand({
			Bucket: bucketName,
			Body: imageAsByteArray,
			Key: S3Name,
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
					`Error from S3 while uploading object to ${bucketName}. \
        The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
        or the multipart upload API (5TB max).`
				);
			} else if (caught instanceof S3ServiceException) {
				console.error(
					`Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`
				);
			} else {
				throw caught;
			}
		}
	};

	const deleteImages = async () => {
		const keys = orderRef.current["items"].map((item) => item.S3TempName);
		console.log("deleteImages: ", keys);
		try {
			const response = await client.send(
				new DeleteObjectsCommand({
					Bucket: S3_TEMP_BUCKET,
					Delete: {
						Objects: keys.map((k) => ({ Key: k })),
					},
				})
			);
			console.log("deleted images: ", response);
		} catch (caught) {
			if (
				caught instanceof S3ServiceException &&
				caught.name === "NoSuchBucket"
			) {
				console.error(
					`Error from S3 while deleting objects from ${S3_TEMP_BUCKET}. The bucket doesn't exist.`
				);
			} else if (caught instanceof S3ServiceException) {
				console.error(
					`Error from S3 while deleting objects from ${S3_TEMP_BUCKET}.  ${caught.name}: ${caught.message}`
				);
			} else {
				throw caught;
			}
		}
	};

	if (redirect_status === "succeeded" || redirect_status === "pending") {
		uploadImages().then(() => {
			deleteImages().then(() => {
				order["items"].forEach((item, index) => deleteItem(index));
			});
		});
	}

	const updateCookies = () => {
		console.log("updateCookies");
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
	};

	useEffect(() => {
		axios.get("http://localhost:3001/api/pricelist").then((result) => {
			setPricelist(result["data"][0]);
		});
	}, []);

	useEffect(() => {
		updateCookies();
	}, [order]);

	console.log("orderNumber: ", order["orderNumber"]);

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
							uploadImages={() => uploadImages()}
							deleteCookies={() => deleteCookies()}
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
							changeOrderNumber={changeOrderNumber}
							changeAmount={changeAmount}
							changeDeliveryAddress={changeDeliveryAddress}
							changeDeliveryType={changeDeliveryType}
							uploadImages={() => uploadImages()}
							deleteCookies={() => deleteCookies()}
						/>
					}
				/>
			</Routes>
		);
	} else return <></>;
};

export default App;
