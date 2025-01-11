import { useState, useEffect, useRef } from "react";

import ProductSection from "./ProductSection";
import NavBar from "../NavBar";
import TitleSection from "../TitleSection";
import FinalSection from "../FinalSection";
import Dialog from "../Dialog";
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

		const sectionNumber = 11;
		if (newScrollPerc <= (1 * 100) / sectionNumber) {
			setBackground("start-background");
		} else if (
			newScrollPerc > (1 * 100) / sectionNumber &&
			newScrollPerc <= (2 * 100) / sectionNumber
		) {
			setBackground("passfotos-background");
		} else if (
			newScrollPerc > (2 * 100) / sectionNumber &&
			newScrollPerc <= (3 * 100) / sectionNumber
		) {
			setBackground("bewerbung-background");
		} else if (
			newScrollPerc > (3 * 100) / sectionNumber &&
			newScrollPerc <= (4 * 100) / sectionNumber
		) {
			setBackground("portraits-background");
		} else if (
			newScrollPerc > (4 * 100) / sectionNumber &&
			newScrollPerc <= (5 * 100) / sectionNumber
		) {
			setBackground("kopien-background");
		} else if (
			newScrollPerc > (5 * 100) / sectionNumber &&
			newScrollPerc <= (6 * 100) / sectionNumber
		) {
			setBackground("produkte-background");
		} else if (
			newScrollPerc > (6 * 100) / sectionNumber &&
			newScrollPerc <= (7 * 100) / sectionNumber
		) {
			setBackground("rahmen-background");
		} else if (
			newScrollPerc > (7 * 100) / sectionNumber &&
			newScrollPerc <= (8 * 100) / sectionNumber
		) {
			setBackground("labor-background");
		} else if (
			newScrollPerc > (8 * 100) / sectionNumber &&
			newScrollPerc <= (9 * 100) / sectionNumber
		) {
			setBackground("video-background");
		} else if (
			newScrollPerc > (9 * 100) / sectionNumber &&
			newScrollPerc <= (10 * 100) / sectionNumber
		) {
			setBackground("glas-background");
		} else if (newScrollPerc > (10 * 100) / sectionNumber) {
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
						margin: "0",
						marginLeft: "51%",
						height: "100vh",
					}}
					id="passfotos"
					overTitle={"Lorem ipsum"}
					title="PASSFOTOS"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={pass}
					imageStyle={{
						position: "absolute",
						width: "30vw",
						top: "150vh",
						left: "15vw",
					}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "20%",
						height: "100vh",
						marginRight: "31%",
					}}
					id="bewerbung"
					overTitle={"Lorem ipsum"}
					title="BEWERBUNGSBILDER"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={bew}
					imageStyle={{
						position: "absolute",
						width: "30vw",
						top: "290vh",
						right: "13vw",
						borderTop: "20px solid white",
						boxSizing: "content-box",
					}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "51%",
						height: "100vh",
					}}
					id="portraits"
					overTitle={"Lorem ipsum"}
					title="PORTRAITS"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={{}}
					imageStyle={{}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "20%",
						height: "100vh",
						marginRight: "31%",
					}}
					id="kopien"
					overTitle={"Lorem ipsum"}
					title="KOPIEN"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={null}
					imageStyle={{}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "20%",
						height: "100vh",
						marginRight: "31%",
					}}
					id="produkte"
					overTitle={"Lorem ipsum"}
					title="PRODUKTE"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={prod}
					imageStyle={{
						position: "absolute",
						width: "30vw",
						top: "665vh",
						right: "20vw",
						boxSizing: "content-box",
					}}
					handleClick={() => {
						setDialogType("fotoprodukte");
						setShowDialog(true);
					}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "51%",
						height: "100vh",
					}}
					id="rahmen"
					overTitle={"Lorem ipsum"}
					title="BILDERRAHMEN"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={null}
					imageStyle={{}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "20%",
						height: "100vh",
						marginRight: "31%",
					}}
					id="labor"
					overTitle={"Lorem ipsum"}
					title="LABOR"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={lab}
					imageStyle={{
						position: "absolute",
						width: "30vw",
						top: "925vh",
						right: "20vw",
						boxSizing: "content-box",
					}}
					handleClick={() => {}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "51%",
						height: "100vh",
					}}
					id="video"
					overTitle={"Lorem ipsum"}
					title="VIDEO"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={video}
					imageStyle={{
						position: "absolute",
						width: "25vw",
						top: "1048vh",
						left: "15vw",
					}}
				/>
				<ProductSection
					sectionStyle={{
						margin: "0",
						marginLeft: "20%",
						height: "100vh",
						marginRight: "31%",
					}}
					id="glas"
					overTitle={"Lorem ipsum"}
					title="3D GLASFOTOBOR"
					mainText={"Lorem ipsum"}
					callToAction={"BESTELLEN"}
					imageSource={glas}
					imageStyle={{
						position: "absolute",
						width: "20vw",
						top: "1175vh",
						right: "25vw",
						boxSizing: "content-box",
					}}
					handleClick={() => {}}
				/>
				<FinalSection />
				<Dialog
					show={showDialog}
					dialogType={dialogType}
					handleRedirect={setDialogType}
					handleClose={() => setShowDialog(false)}
					order={order}
					pricelist={pricelist}
					addItem={addItem}
					deleteItem={deleteItem}
					changeDeliveryType={changeDeliveryType}
				/>
			</div>
		</div>
	);
};

export default CustomerSide;
