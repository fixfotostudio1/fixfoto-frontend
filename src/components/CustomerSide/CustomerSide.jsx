import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
} from "../../utils/config";

import ProductSection from "./ProductSection";
import NavBar from "./NavBar";
import TitleSection from "./TitleSection";
import FinalSection from "./FinalSection";
import Dialog from "./Dialog";
import ShoppingCart from "./ShoppingCart";

import pass from "../../assets/pass.png";
import bew from "../../assets/bew2.jpg";
import prod from "../../assets/prod.png";
import lab from "../../assets/labor.png";
import video from "../../assets/video.png";
import glas from "../../assets/glas.png";
import rahmen from "../../assets/rahmen.webp";
import kopien from "../../assets/kopien.png";
import portrait from "../../assets/portrait.jpg";

const CustomerSide = ({ intentId, orderSuccess, pricelist }) => {
	const [background, setBackground] = useState("start-background");
	const [showDialog, setShowDialog] = useState(false);
	const [dialogType, setDialogType] = useState(null);

	const updateBackground = () => {
		const newScrollPerc =
			(window.scrollY /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight)) *
			100;

		const sectionNumber = 11;
		const offset = 0;
		if (newScrollPerc <= (1 * 100 - offset) / sectionNumber) {
			setBackground("start-background");
		} else if (
			newScrollPerc > (1 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (2 * 100 - offset) / sectionNumber
		) {
			setBackground("passfotos-background");
		} else if (
			newScrollPerc > (2 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (3 * 100 - offset) / sectionNumber
		) {
			setBackground("bewerbung-background");
		} else if (
			newScrollPerc > (3 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (4 * 100 - offset) / sectionNumber
		) {
			setBackground("portraits-background");
		} else if (
			newScrollPerc > (4 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (5 * 100 - offset) / sectionNumber
		) {
			setBackground("produkte-background");
		} else if (
			newScrollPerc > (5 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (6 * 100 - offset) / sectionNumber
		) {
			setBackground("rahmen-background");
		} else if (
			newScrollPerc > (6 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (7 * 100 - offset) / sectionNumber
		) {
			setBackground("labor-background");
		} else if (
			newScrollPerc > (7 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (8 * 100 - offset) / sectionNumber
		) {
			setBackground("video-background");
		} else if (
			newScrollPerc > (8 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (9 * 100 - offset) / sectionNumber
		) {
			setBackground("glas-background");
		} else if (
			newScrollPerc > (9 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (10 * 100 - offset) / sectionNumber
		) {
			setBackground("kopien-background");
		} else if (newScrollPerc > (10 * 100 - offset) / sectionNumber) {
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
					paymentId: "",
			  }
	);
	const orderRef = useRef({ current: order });
	orderRef.current = order;

	const addItem = (newItem) => {
		const newItems = orderRef.current["items"].concat([newItem]);
		setOrder({ ...orderRef.current, items: newItems });

		console.log("addItem");

		const reader = new FileReader();
		reader.readAsArrayBuffer(newItem.file);
		reader.onload = (e) => {
			uploadImage(e.target.result, newItem.S3TempName, S3_TEMP_BUCKET);
		};
	};

	const deleteItem = (index) => {
		console.log("deleteItem");
		const newItems = orderRef.current["items"]
			.slice(0, index)
			.concat(orderRef.current["items"].slice(index + 1));
		setOrder({ ...orderRef.current, items: newItems });
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

	const changeDeliveryAddress = (key, value) => {
		const newDeliveryAddress = { ...orderRef.current["deliveryAddress"] };
		newDeliveryAddress[key] = value;
		setOrder({ ...orderRef.current, deliveryAddress: newDeliveryAddress });
		console.log("changeDeliveryAddress");
	};

	const changeDeliveryType = (newType) => {
		console.log("changeDeliveryType");
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
			console.log("uploadImage");
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
		console.log("deleteImages");
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

		Cookies.set("order", JSON.stringify(cookiesOrder), { expires: 7 });
	};

	const saveOrder = async () => {
		const filelessOrder = {
			...orderRef.current,
			intentId: intentId,
			items: orderRef.current["items"].map((item) =>
				Object({ ...item, file: null })
			),
		};
		await axios.post("http://localhost:3001/api/orders/", {
			order: filelessOrder,
		});

		console.log("saveOrder");
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
		if (
			(orderSuccess === "succeeded" || orderSuccess === "pending") &&
			orderRef.current["orderNumber"] !== ""
		) {
			uploadImages().then(() => {
				deleteImages()
					.then(() => {
						saveOrder();
					})
					.then(() => {
						setOrder({ ...orderRef.current, items: [], orderNumber: "" });
					});
			});
		}
	}, [orderSuccess]);

	useEffect(() => {
		updateCookies();
	}, [order]);

	return (
		<div id="top-container" style={{ maxWidth: "100vw" }}>
			<div
				id="main-container"
				className={`d-flex flex-column ${background}`}
				style={{
					height: "1100vh",
					maxWidth: "100vw",
				}}
			>
				<NavBar currBackground={background} />
				<TitleSection />
				<ProductSection
					sectionStyle={{
						top: "100vh",
					}}
					id="passfotos"
					overTitle={null}
					title="PASSFOTOS"
					mainText={Object.keys(pricelist["passfotos"]).map((prod) => {
						return (
							<>
								{prod}: € {pricelist["passfotos"][prod]}
								<br />
								<br />
							</>
						);
					})}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={pass}
					imageSide={"left"}
					imageStyle={{
						width: "30vw",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "200vh",
					}}
					id="bewerbung"
					overTitle={null}
					title={
						<>
							BEWERBUNGS- <br /> BILDER
						</>
					}
					mainText={Object.keys(pricelist["bewerbungsbilder"]).map((prod) => {
						return (
							<>
								{prod}: € {pricelist["bewerbungsbilder"][prod]}
								<br />
								<br />
							</>
						);
					})}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={bew}
					imageSide={"right"}
					imageStyle={{
						width: "25vmax",
						border: "5px solid white",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "300vh",
					}}
					id="portraits"
					overTitle={null}
					title="PORTRAITS"
					mainText={Object.keys(pricelist["portraits"]).map((prod) => {
						return (
							<>
								{prod}: € {pricelist["portraits"][prod]}
								<br />
								<br />
							</>
						);
					})}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={portrait}
					imageSide={"left"}
					imageStyle={{
						width: "25vmax",
						border: "5px solid white",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "400vh",
					}}
					id="produkte"
					overTitle={null}
					title="PRODUKTE"
					mainText={
						<>
							<b>Poster (Glanz oder Matt)</b>
							<br />
							Größe von 30 x 30 cm bis 50 x 70 cm
							<br />
							Preise von € 17,90 bis € 44,90
							<br />
							<br />
							<b>Leinen auf Keilrahmen</b>
							<br />
							Größe von 30 x 30 cm bis 50 x 70 cm
							<br />
							Preise von € 34,90 bis € 69,90
							<br />
							<br />
							<b>Tassendruck</b>
							<br />
							Verschiedene Farben: € 19,90
							<br />
							Magic: € 24,90
							<br />
							<br />
							<b>Kissendruck</b>
							<br />
							Verschiedene Farben: € 24,90
							<br />
							<br />
						</>
					}
					callToAction={"ONLINE BESTELLEN"}
					imageSource={prod}
					imageSide={"right"}
					imageStyle={{
						width: "30vw",
					}}
					handleClick={() => {
						setDialogType("fotoprodukte");
						setShowDialog(true);
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "500vh",
					}}
					id="rahmen"
					overTitle={null}
					title="BILDERRAHMEN"
					mainText={
						<>
							<b>Kunststoffrahmen</b>
							<br />
							Größe von 10 x 15 cm bis 70 x 100 cm
							<br />
							Preise von € 4,90 bis € 39,90
							<br />
							<br />
							<b>Quadratische Kunststoffrahmen</b>
							<br />
							Größe von 10 x 10 cm bis 40 x 40 cm
							<br />
							Preise von € 4,90 bis € 39,90
							<br />
							<br />
							<b>Rahmenlose Rahmen</b>
							<br />
							Größe von 10 x 15 cm bis 50 x 70 cm
							<br />
							Preise von € 4,90 bis € 39,90
							<br />
							<br />
							<b>Silberrahmen</b>
							<br />
							Größe von 3 x 5 cm bis 20 x 30 cm
							<br />
							Preise von € 13,9 bis € 39,90
							<br />
							<br />
						</>
					}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={rahmen}
					imageSide={"left"}
					imageStyle={{ width: "30vw" }}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "600vh",
					}}
					id="labor"
					overTitle={null}
					title="LABOR"
					mainText={
						<>
							<b>Filmentwicklung</b>
							<br />
							Farbe: € 7,00
							<br />
							Schwarz-weiß: € 9,00
							<br />
							<br />
							<b>Bild-Scannen</b>
							<br />
							Pro Neg.: € 0,70
							<br />
							Pro Dia: € 0,90
							<br />
							Pro Bild: € 0,90
							<br />
							<br />
							<b>Bild vom Negativen</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von € 0,30 bis € 4,00
							<br />
							<br />
							<b>Bilder vom Diafilm/Rollfilm/Planfilm</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von € 1,50 bis € 5,00
							<br />
							<br />
							<b>Bild vom Bild</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von € 1,00 bis € 5,00
							<br />
							<br />
							Bearbeitungsgebühren: € 2,00
							<br />
							Speichern auf Medien, E-Mail senden: € 5,00
							<br />
							<br />
						</>
					}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={lab}
					imageSide={"right"}
					imageStyle={{
						width: "30vw",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "700vh",
					}}
					id="video"
					overTitle={null}
					title="VIDEO"
					mainText={
						<>
							<b>Kassetten VHS, VHS-C, auf DVD oder USB</b>
							<br />
							Pro Kassette: € 29,50
							<br />
							<br />
							<b>Super 8 auf DVD</b>
							<br />
							Kleine Spule: € 44,90
							<br />
							Mittlere Spule: € 54,90
							<br />
							Große Spule: € 64,90
							<br />
							<br />
						</>
					}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={video}
					imageSide={"left"}
					imageStyle={{
						width: "25vw",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionStyle={{
						top: "800vh",
					}}
					id="glas"
					overTitle={null}
					title="3D GLASFOTOLABOR"
					mainText={"Lorem ipsum"}
					callToAction={"ONLINE BESTELLEN"}
					imageSource={glas}
					imageSide={"right"}
					imageStyle={{
						width: "20vw",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>

				<ProductSection
					sectionStyle={{
						top: "900vh",
					}}
					id="kopien"
					overTitle={null}
					title="KOPIEN"
					mainText={
						<>
							<b>Schwarz-weiß Fotokopien</b>
							<br />
							1 Kopie: € 0,20
							<br />
							1 PDF-Ausdruck: € 0,50
							<br />
							<br />
							<b>Laminieren</b>
							<br />
							A3: € 4,00
							<br />
							A4: € 3,00
							<br />
							A5: € 2,00
							<br />
							A6: € 2,00
							<br />
							<br />
							<b>PDF-Scannen</b>
							<br />
							Pro Blatt: € 1,00
							<br />
							<br />
						</>
					}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={kopien}
					imageSide={"left"}
					imageStyle={{
						width: "20vmax",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<FinalSection
					handleClick={(type) => {
						setShowDialog(true);
						setDialogType(type);
					}}
				/>
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
				/>
				<ShoppingCart
					order={order}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("CartAndCheckoutDialog");
					}}
				/>
			</div>
		</div>
	);
};

export default CustomerSide;
