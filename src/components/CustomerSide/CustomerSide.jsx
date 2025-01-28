import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/config";

import {
	S3Client,
	S3ServiceException,
	DeleteObjectsCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import Cookies from "js-cookie";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

import {
	S3_BUCKET,
	S3_TEMP_BUCKET,
	REGION,
	AWS_IDENTITY_POOL_ID,
} from "../../utils/config";

import ProductSection from "./ProductSection";
import NavBar from "./NavBar";
import TitleSection from "./TitleSection";
import FinalSection from "./FinalSection";
import Dialog from "./Dialog";
import ShoppingCart from "../ShoppingCart";

import pass from "../../assets/pass.png";
import bew from "../../assets/bew.jpg";
import prod from "../../assets/prod.png";
import lab from "../../assets/labor.png";
import video from "../../assets/video.png";
import glas from "../../assets/glas.png";

const CustomerSide = ({ orderSuccess, pricelist }) => {
	const [background, setBackground] = useState("start-background");
	const [showDialog, setShowDialog] = useState(false);
	const [dialogType, setDialogType] = useState(null);

	const updateBackground = () => {
		const newScrollPerc =
			(window.scrollY /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight)) *
			100;

		const sectionNumber = 12;
		if (newScrollPerc <= (1 * 100 - 50) / sectionNumber) {
			setBackground("start-background");
		} else if (
			newScrollPerc > (1 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (2 * 100 - 50) / sectionNumber
		) {
			setBackground("passfotos-background");
		} else if (
			newScrollPerc > (2 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (3 * 100 - 50) / sectionNumber
		) {
			setBackground("bewerbung-background");
		} else if (
			newScrollPerc > (3 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (4 * 100 - 50) / sectionNumber
		) {
			setBackground("portraits-background");
		} else if (
			newScrollPerc > (4 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (5 * 100 - 50) / sectionNumber
		) {
			setBackground("produkte-background");
		} else if (
			newScrollPerc > (5 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (6 * 100 - 50) / sectionNumber
		) {
			setBackground("rahmen-background");
		} else if (
			newScrollPerc > (6 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (7 * 100 - 50) / sectionNumber
		) {
			setBackground("labor-background");
		} else if (
			newScrollPerc > (7 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (8 * 100 - 50) / sectionNumber
		) {
			setBackground("video-background");
		} else if (
			newScrollPerc > (8 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (9 * 100 - 50) / sectionNumber
		) {
			setBackground("glas-background");
		} else if (
			newScrollPerc > (9 * 100 - 50) / sectionNumber &&
			newScrollPerc <= (10 * 100 - 50) / sectionNumber
		) {
			setBackground("kopien-background");
		} else if (newScrollPerc > (10 * 100 - 50) / sectionNumber) {
			setBackground("final-background");
		}
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

		cancelIntent();
	};

	const deleteItem = (index) => {
		console.log("deleteItem");
		const newItems = orderRef.current["items"]
			.slice(0, index)
			.concat(orderRef.current["items"].slice(index + 1));
		setOrder({ ...orderRef.current, items: newItems });
		cancelIntent();
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
		cancelIntent();
	};

	const changeDeliveryAddress = (key, value) => {
		const newDeliveryAddress = { ...orderRef.current["deliveryAddress"] };
		newDeliveryAddress[key] = value;
		setOrder({ ...orderRef.current, deliveryAddress: newDeliveryAddress });
	};

	const changeDeliveryType = (newType) => {
		setOrder({ ...orderRef.current, deliveryType: newType });
	};

	const changeOrderNumber = (newOrderNumber) => {
		console.log("changeOrderNumber");
		setOrder({ ...orderRef.current, orderNumber: newOrderNumber });
	};

	const client = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: REGION },
			identityPoolId: AWS_IDENTITY_POOL_ID,
		}),
	});

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

	const saveOrder = () => {
		const filelessOrder = {
			...orderRef.current,
			items: orderRef.current["items"].map((item) =>
				Object({ ...item, file: null })
			),
		};
		console.log("Dialog filelessOrder: ", filelessOrder);
		axios.post("http://localhost:3001/api/orders/", {
			order: filelessOrder,
		});
	};

	const [clientSecret, setClientSecret] = useState(null);
	const clientSecretRef = useRef({ current: clientSecret });
	clientSecretRef.current = clientSecret;

	const fetchClientSecret = () => {
		if (!clientSecretRef.current) {
			axios
				.post("http://localhost:3001/api/orders/fetchClientSecret", {
					items: order.items,
					deliveryType: order.deliveryType,
				})
				.then((result) => {
					changeOrderNumber(Date.now().toString());
					console.log("Dialog clientSecret: ", result["data"]["client_secret"]);
					setClientSecret(result["data"]["client_secret"]);
				});
		}
	};

	const cancelIntent = async () => {
		if (clientSecretRef.current) {
			const paymentIntent = await stripe.paymentIntents.cancel(
				clientSecretRef.current.split("_secret_")[0]
			);
			setClientSecret(null);
			console.log("CustomerSide intent cancelled");
		}
	};

	useEffect(() => {
		if (orderSuccess) {
			setDialogType("PostPaymentInfoDialog");
			setShowDialog(true);
		}
		window.addEventListener("scroll", updateBackground);

		return () => {
			window.removeEventListener("scroll", updateBackground);
		};
	}, []);

	useEffect(() => {
		updateCookies();
	}, [order]);

	useEffect(() => {
		if (orderSuccess === "succeeded" || orderSuccess === "pending") {
			uploadImages().then(() => {
				deleteImages().then(() => {
					order["items"].forEach((item, index) => deleteItem(index));
					saveOrder();
				});
			});
		}
	}, [orderSuccess]);

	console.log("orderNumber: ", order);

	return (
		<div id="top-container" style={{ maxWidth: "100vw" }}>
			<div
				id="main-container"
				className={`d-flex flex-column ${background}`}
				style={{
					height: "1370vh",
					maxWidth: "100vw",
				}}
			>
				<NavBar />
				<TitleSection />
				<ProductSection
					sectionStyle={{
						top: "100vh",
					}}
					id="passfotos"
					overTitle={"Lorem ipsum"}
					title="PASSFOTOS"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={pass}
					imageSide={"left"}
					imageStyle={{
						width: "30vw",
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "200vh",
					}}
					id="bewerbung"
					overTitle={"Lorem ipsum"}
					title="BEWERBUNGSBILDER"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={bew}
					imageSide={"right"}
					imageStyle={{
						width: "30vw",
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "300vh",
					}}
					id="portraits"
					overTitle={"Lorem ipsum"}
					title="PORTRAITS"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={{}}
					imageSide={"left"}
					imageStyle={{}}
				/>
				<ProductSection
					sectionStyle={{
						top: "400vh",
					}}
					id="produkte"
					overTitle={"Lorem ipsum"}
					title="PRODUKTE"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={prod}
					imageSide={"right"}
					imageStyle={{
						width: "30vw",
					}}
					handleClick={() => {
						setDialogType("fotoprodukte");
						setShowDialog(true);
						console.log("products handleClick");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "500vh",
					}}
					id="rahmen"
					overTitle={"Lorem ipsum"}
					title="BILDERRAHMEN"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={null}
					imageSide={"left"}
					imageStyle={{}}
				/>
				<ProductSection
					sectionStyle={{
						top: "600vh",
					}}
					id="labor"
					overTitle={"Lorem ipsum"}
					title="LABOR"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={lab}
					imageSide={"right"}
					imageStyle={{
						width: "30vw",
					}}
					handleClick={() => {}}
				/>
				<ProductSection
					sectionStyle={{
						top: "700vh",
					}}
					id="video"
					overTitle={"Lorem ipsum"}
					title="VIDEO"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={video}
					imageSide={"left"}
					imageStyle={{
						width: "25vw",
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "800vh",
					}}
					id="glas"
					overTitle={"Lorem ipsum"}
					title="3D GLASFOTOBOR"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={glas}
					imageSide={"right"}
					imageStyle={{
						width: "20vw",
					}}
					handleClick={() => {}}
				/>

				<ProductSection
					sectionStyle={{
						top: "900vh",
					}}
					id="kopien"
					overTitle={"Lorem ipsum"}
					title="KOPIEN"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={null}
					imageSide={"left"}
					imageStyle={{}}
				/>
				<FinalSection />
				<Dialog
					showDialog={showDialog}
					dialogType={dialogType}
					handleClose={() => setShowDialog(false)}
					handleRedirect={setDialogType}
					order={order}
					orderSuccess={orderSuccess}
					pricelist={pricelist}
					addItem={addItem}
					deleteItem={deleteItem}
					changeOrderNumber={changeOrderNumber}
					changeAmount={changeAmount}
					changeDeliveryAddress={changeDeliveryAddress}
					changeDeliveryType={changeDeliveryType}
					clientSecret={clientSecret}
					fetchClientSecret={fetchClientSecret}
					stripePromise={stripePromise}
				/>
			</div>
		</div>
	);
};

export default CustomerSide;
