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
import bew from "../../assets/bewe.jpg";
import prod from "../../assets/prod.png";
import lab from "../../assets/labor.png";
import video from "../../assets/video.png";
import glas from "../../assets/glas.png";
import rahmen from "../../assets/rahmen.webp";
import kopien from "../../assets/kopien.png";
import portrait from "../../assets/portr.jpg";

const findMinValue = (obj) => {
	return Math.min.apply(null, [
		...Object.values(obj).map((item) => parseFloat(item)),
	]);
};

const findMaxValue = (obj) => {
	return Math.max.apply(null, [
		...Object.values(obj).map((item) => parseFloat(item)),
	]);
};

const SECTION_SIZE = "130";

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

	const [AGBAgreement, setAGBAgreement] = useState(false);

	const addItem = (newItem) => {
		const newItems = orderRef.current["items"].concat([newItem]);
		setOrder({ ...orderRef.current, items: newItems });

		const reader = new FileReader();
		reader.readAsArrayBuffer(newItem.file);
		reader.onload = (e) => {
			uploadImage(e.target.result, newItem.S3TempName, S3_TEMP_BUCKET);
		};
	};

	const deleteItem = (index) => {
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
	};

	const changeDeliveryType = (newType) => {
		setOrder({ ...orderRef.current, deliveryType: newType });
	};

	const changeOrderNumber = (newOrderNumber) => {
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
		try {
			const response = await client.send(
				new DeleteObjectsCommand({
					Bucket: S3_TEMP_BUCKET,
					Delete: {
						Objects: keys.map((k) => ({ Key: k })),
					},
				})
			);
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
			orderSuccess: orderSuccess,
			items: orderRef.current["items"].map((item) =>
				Object({ ...item, file: null })
			),
		};
		await axios.post("http://localhost:3001/api/orders/", {
			order: filelessOrder,
		});
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
					height: `${SECTION_SIZE * 11}vh`,
					maxWidth: "100vw",
				}}
			>
				<NavBar currBackground={background} sectionSize={SECTION_SIZE} />
				<TitleSection sectionSize={SECTION_SIZE} />
				<ProductSection
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${SECTION_SIZE}vh`,
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${2 * SECTION_SIZE}vh`,
					}}
					id="bewerbung"
					overTitle={null}
					title={
						<>
							BEWERBUNGS- <br /> BILDER
						</>
					}
					mainText={Object.keys(pricelist["bewerbungsbilder"]).map((prod) => (
						<>
							{prod}: € {pricelist["bewerbungsbilder"][prod]}
							<br />
							<br />
						</>
					))}
					callToAction={"IHR WEG ZU UNS"}
					imageSource={bew}
					imageSide={"right"}
					imageStyle={{
						width: "18vmax",
						border: "5px solid white",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${3 * SECTION_SIZE}vh`,
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
						width: "18vmax",
						border: "5px solid white",
					}}
					handleClick={() => {
						setShowDialog(true);
						setDialogType("LocationDialog");
					}}
				/>
				<ProductSection
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${4 * SECTION_SIZE}vh`,
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
							Preise von €{" "}
							{findMinValue({
								...pricelist["fotoprodukte"]["Poster (Glanz)"],
								...pricelist["fotoprodukte"]["Poster (Matt)"],
							})}{" "}
							bis €{" "}
							{findMaxValue({
								...pricelist["fotoprodukte"]["Poster (Glanz)"],
								...pricelist["fotoprodukte"]["Poster (Matt)"],
							})}
							<br />
							<br />
							<b>Leinen auf Keilrahmen</b>
							<br />
							Größe von 30 x 30 cm bis 50 x 70 cm
							<br />
							Preise von €{" "}
							{findMinValue(
								pricelist["fotoprodukte"]["Leinen auf Keilrahmen"]
							)}{" "}
							bis €{" "}
							{findMaxValue(pricelist["fotoprodukte"]["Leinen auf Keilrahmen"])}
							<br />
							<br />
							<b>Tassendruck</b>
							<br />
							Verschiedene Farben: €{" "}
							{pricelist["fotoprodukte"]["Tassendruck"]["Verschiedene Farben"]}
							<br />
							Magic: € {pricelist["fotoprodukte"]["Tassendruck"]["Magic"]}
							<br />
							<br />
							<b>Kissendruck</b>
							<br />
							Verschiedene Farben: €{" "}
							{pricelist["fotoprodukte"]["Kissendruck"]["Verschiedene Farben"]}
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${5 * SECTION_SIZE}vh`,
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
							Preise von € {pricelist["rahmen"]["Kunststoffrahmen"]["min"]} bis
							€ {pricelist["rahmen"]["Kunststoffrahmen"]["max"]}
							<br />
							<br />
							<b>Quadratische Kunststoffrahmen</b>
							<br />
							Größe von 10 x 10 cm bis 40 x 40 cm
							<br />
							Preise von €{" "}
							{pricelist["rahmen"]["Quadratische Kunststoffrahmen"]["min"]} bis
							€ {pricelist["rahmen"]["Quadratische Kunststoffrahmen"]["max"]}
							<br />
							<br />
							<b>Rahmenlose Rahmen</b>
							<br />
							Größe von 10 x 15 cm bis 50 x 70 cm
							<br />
							Preise von € {pricelist["rahmen"]["Rahmenlose Rahmen"]["min"]} bis
							€ {pricelist["rahmen"]["Rahmenlose Rahmen"]["max"]}
							<br />
							<br />
							<b>Silberrahmen</b>
							<br />
							Größe von 3 x 5 cm bis 20 x 30 cm
							<br />
							Preise von € {pricelist["rahmen"]["Silberrahmen"]["min"]} bis €{" "}
							{pricelist["rahmen"]["Silberrahmen"]["max"]}
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${6 * SECTION_SIZE}vh`,
					}}
					id="labor"
					overTitle={null}
					title="LABOR"
					mainText={
						<>
							<b>Filmentwicklung</b>
							<br />
							Farbe: € {pricelist["labor"]["Filmentwicklung"]["Farbe"]}
							<br />
							Schwarz-weiß: €{" "}
							{pricelist["labor"]["Filmentwicklung"]["Schwarz-weiß"]}
							<br />
							<br />
							<b>Bild-Scannen</b>
							<br />
							Pro Neg.: € {pricelist["labor"]["Bild-Scannen"]["Pro Neg."]}
							<br />
							Pro Dia: € {pricelist["labor"]["Bild-Scannen"]["Pro Dia"]}
							<br />
							Pro Bild: € {pricelist["labor"]["Bild-Scannen"]["Pro Bild"]}
							<br />
							<br />
							<b>Bild vom Negativen</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von €{" "}
							{findMinValue(pricelist["labor"]["Bild vom Negativen"])} bis €{" "}
							{findMaxValue(pricelist["labor"]["Bild vom Negativen"])}
							<br />
							<br />
							<b>Bilder vom Diafilm/Rollfilm/Planfilm</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von €{" "}
							{findMinValue(
								pricelist["labor"]["Bilder vom Diafilm/Rollfilm/Planfilm"]
							)}{" "}
							bis €{" "}
							{findMaxValue(
								pricelist["labor"]["Bilder vom Diafilm/Rollfilm/Planfilm"]
							)}
							<br />
							<br />
							<b>Bild vom Bild</b>
							<br />
							Größe von 9 x 13 cm bis 21 x 29,7 cm
							<br />
							Preise von € {findMinValue(
								pricelist["labor"]["Bild vom Bild"]
							)}{" "}
							bis € {findMaxValue(pricelist["labor"]["Bild vom Bild"])}
							<br />
							<br />
							Bearbeitungsgebühren: €{" "}
							{pricelist["labor"]["Sonstiges"]["Bearbeitungsgebühren"]}
							<br />
							Speichern auf Medien, E-Mail senden: €{" "}
							{
								pricelist["labor"]["Sonstiges"][
									"Speichern auf Medien, E-Mail senden"
								]
							}
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${7 * SECTION_SIZE}vh`,
					}}
					id="video"
					overTitle={null}
					title="VIDEO"
					mainText={
						<>
							<b>Kassetten VHS, VHS-C, auf DVD oder USB</b>
							<br />
							Pro Kassette: €{" "}
							{
								pricelist["videokassetten"][
									"Kassetten VHS, VHS-C, auf DVD oder USB"
								]["Pro Kassette"]
							}
							<br />
							<br />
							<b>Super 8 auf DVD</b>
							<br />
							Kleine Spule: €{" "}
							{pricelist["videokassetten"]["Super 8 auf DVD"]["Kleine Spule"]}
							<br />
							Mittlere Spule: €{" "}
							{pricelist["videokassetten"]["Super 8 auf DVD"]["Mittlere Spule"]}
							<br />
							Große Spule: €{" "}
							{pricelist["videokassetten"]["Super 8 auf DVD"]["Große Spule"]}
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${8 * SECTION_SIZE}vh`,
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
					sectionSize={SECTION_SIZE}
					sectionStyle={{
						top: `${9 * SECTION_SIZE}vh`,
					}}
					id="kopien"
					overTitle={null}
					title="KOPIEN"
					mainText={
						<>
							<b>Schwarz-weiß Fotokopien</b>
							<br />1 Kopie: €{" "}
							{pricelist["kopien"]["Schwarz-weiß Fotokopien"]["1 Kopie"]}
							<br />1 PDF-Ausdruck: €{" "}
							{pricelist["kopien"]["Schwarz-weiß Fotokopien"]["1 PDF-Ausdruck"]}
							<br />
							<br />
							<b>Laminieren</b>
							<br />
							A3: € {pricelist["kopien"]["Laminieren"]["A3"]}
							<br />
							A4: € {pricelist["kopien"]["Laminieren"]["A4"]}
							<br />
							A5: € {pricelist["kopien"]["Laminieren"]["A5"]}
							<br />
							A6: € {pricelist["kopien"]["Laminieren"]["A6"]}
							<br />
							<br />
							<b>PDF-Scannen</b>
							<br />
							Pro Blatt: € {pricelist["kopien"]["PDF-Scannen"]["Pro Blatt"]}
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
					sectionSize={SECTION_SIZE}
					handleClick={(type) => {
						setShowDialog(true);
						setDialogType(type);
					}}
				/>
				<Dialog
					AGBAgreement={AGBAgreement}
					setAGBAgreement={setAGBAgreement}
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
