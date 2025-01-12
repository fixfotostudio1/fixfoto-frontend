import { useState, useEffect, useRef } from "react";

import ProductSection from "./ProductSection";
import NavBar from "../NavBar";
import TitleSection from "../TitleSection";
import FinalSection from "../FinalSection";
import Dialog from "./Dialog";
import ShoppingCart from "../ShoppingCart";

import pass from "../../assets/pass.png";
import bew from "../../assets/bew.jpg";
import prod from "../../assets/prod.png";
import lab from "../../assets/labor.png";
import video from "../../assets/video.png";
import glas from "../../assets/glas.png";

const CustomerSide = ({
	order,
	orderSuccess,
	pricelist,
	addItem,
	changeDeliveryAddress,
	changeDeliveryType,
	deleteItem,
	submitPayement,
}) => {
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

	useEffect(() => {
		if (orderSuccess) {
			setDialogType("ConfirmationDialog");
			setShowDialog(true);
		}
		window.addEventListener("scroll", updateBackground);

		return () => {
			window.removeEventListener("scroll", updateBackground);
		};
	}, []);

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
					pricelist={pricelist}
					addItem={addItem}
					deleteItem={deleteItem}
					changeDeliveryAddress={changeDeliveryAddress}
					changeDeliveryType={changeDeliveryType}
					submitPayment={submitPayement}
				/>
			</div>
		</div>
	);
};

export default CustomerSide;
