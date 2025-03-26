import { createContext, useState, useEffect, useRef } from "react";
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

import passfotos from "../../assets/pass.png";
import bewerbungsbilder from "../../assets/bewe_wb1.png";
import portraits from "../../assets/portr_wb.png";
import fotoprodukte from "../../assets/prod.png";
import rahmen from "../../assets/rahmen.webp";
import labor from "../../assets/labor.png";
import videokassetten from "../../assets/video.png";
import glasfotos from "../../assets/glas.png";
import kopien from "../../assets/kopien.png";

export const ProductSectionContext = createContext({});
export const DialogContext = createContext({});

const SECTION_SIZE = "130";

const CustomerSide = ({ intentId, orderSuccess, pricelist }) => {
	const supertypes = Object.keys(pricelist).filter(
		(supertype) => !["id", "delivery"].includes(supertype)
	);

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
			setBackground("bewerbungsbilder-background");
		} else if (
			newScrollPerc > (3 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (4 * 100 - offset) / sectionNumber
		) {
			setBackground("portraits-background");
		} else if (
			newScrollPerc > (4 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (5 * 100 - offset) / sectionNumber
		) {
			setBackground("fotoprodukte-background");
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
			setBackground("videokassetten-background");
		} else if (
			newScrollPerc > (8 * 100 - offset) / sectionNumber &&
			newScrollPerc <= (9 * 100 - offset) / sectionNumber
		) {
			setBackground("glasfotos-background");
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

	const determineCalltoAction = (id) => {
		switch (id) {
			case "fotoprodukte":
			case "glasfotos":
				return "ONLINE BESTELLEN";
			default:
				return "IHR WEG ZU UNS";
		}
	};

	const determineHandleClick = (id) => {
		switch (id) {
			case "fotoprodukte":
				return () => {
					setShowDialog(true);
					setDialogType(id);
				};
			case "glasfotos":
				return () => {};
			default:
				return () => {
					setShowDialog(true);
					setDialogType("LocationDialog");
				};
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
				<ProductSectionContext.Provider
					value={{ pricelist: pricelist, sectionSize: SECTION_SIZE }}
				>
					<ProductSection
						callToAction={determineCalltoAction("passfotos")}
						id="passfotos"
						imageSource={passfotos}
						seqNumber={1}
						handleClick={determineHandleClick("passfotos")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("bewerbungsbilder")}
						id="bewerbungsbilder"
						imageSource={bewerbungsbilder}
						seqNumber={2}
						handleClick={determineHandleClick("bewerbungsbilder")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("portraits")}
						id="portraits"
						imageSource={portraits}
						seqNumber={3}
						handleClick={determineHandleClick("portraits")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("fotoprodukte")}
						id="fotoprodukte"
						imageSource={fotoprodukte}
						seqNumber={4}
						handleClick={determineHandleClick("fotoprodukte")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("rahmen")}
						id="rahmen"
						imageSource={rahmen}
						seqNumber={5}
						handleClick={determineHandleClick("rahmen")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("labor")}
						id="labor"
						imageSource={labor}
						seqNumber={6}
						handleClick={determineHandleClick("labor")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("videokassetten")}
						id="videokassetten"
						imageSource={videokassetten}
						seqNumber={7}
						handleClick={determineHandleClick("videokassetten")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("glasfotos")}
						id="glasfotos"
						imageSource={glasfotos}
						seqNumber={8}
						handleClick={determineHandleClick("glasfotos")}
					/>
					<ProductSection
						callToAction={determineCalltoAction("kopien")}
						id="kopien"
						imageSource={kopien}
						seqNumber={9}
						handleClick={determineHandleClick("kopien")}
					/>
				</ProductSectionContext.Provider>
				<FinalSection
					sectionSize={SECTION_SIZE}
					handleClick={(dialogType) => {
						console.log("type CustomerSide: ", dialogType);
						setShowDialog(true);
						setDialogType(dialogType);
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
