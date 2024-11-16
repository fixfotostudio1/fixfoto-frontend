import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OddSection from "./components/OddSection";
import EvenSection from "./components/EvenSection";
import NavBar from "./components/NavBar";
import TitleSection from "./components/TitleSection";
import FinalSection from "./components/FinalSection";
import Dialog from "./components/Dialog";
import ShoppingCart from "./components/ShoppingCart";

import pass from "./assets/pass.png";
import bew from "./assets/bew.jpg";
import prod from "./assets/prod.png";
import lab from "./assets/labor.png";
import video from "./assets/video.png";
import glas from "./assets/glas.png";

const App = () => {
	const [scrollPerc, setScrollPerc] = useState(0);
	const [background, setBackground] = useState("start-background");
	const [showDialog, setShowDialog] = useState(false);
	const [dialogType, setDialogType] = useState(null);
	const [shoppingCartContent, setShoppingCartContent] = useState([]);

	const shoppingCartRef = useRef({ current: [] });
	shoppingCartRef.current = shoppingCartContent;

	const updateShoppingCartContent = (item) => {
		console.log("shoppingCartContent: ", shoppingCartContent);
		//console.log("shoppingCartContent: ", shoppingCartContent);
		setShoppingCartContent([...shoppingCartRef.current, item]);
	};

	const updateBackground = () => {
		const newScrollPerc =
			(window.scrollY /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight)) *
			100;

		const sectionNumber = 10;
		setScrollPerc(newScrollPerc);
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
			setBackground("produkte-background");
		} else if (
			newScrollPerc > (5 * 100) / sectionNumber &&
			newScrollPerc <= (6 * 100) / sectionNumber
		) {
			setBackground("rahmen-background");
		} else if (
			newScrollPerc > (6 * 100) / sectionNumber &&
			newScrollPerc <= (7 * 100) / sectionNumber
		) {
			setBackground("labor-background");
		} else if (
			newScrollPerc > (7 * 100) / sectionNumber &&
			newScrollPerc <= (8 * 100) / sectionNumber
		) {
			setBackground("video-background");
		} else if (
			newScrollPerc > (8 * 100) / sectionNumber &&
			newScrollPerc <= (9 * 100) / sectionNumber
		) {
			setBackground("glas-background");
		} else if (newScrollPerc > (9 * 100) / sectionNumber) {
			setBackground("final-background");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", updateBackground);

		return () => {
			window.removeEventListener("scroll", updateBackground);
		};
	});

	return (
		<div id="top-container" style={{ maxWidth: "100vw" }}>
			<div
				id="main-container"
				className={`d-flex flex-column ${background}`}
				style={{
					height: "1270vh",
					maxWidth: "100vw",
				}}
			>
				<NavBar />
				<TitleSection />
				<img
					className="position-absolute "
					src={pass}
					alt=""
					style={{
						width: "60vmin",
						top: "160vh",
						left: "15vw",
					}}
				/>
				<img
					className="position-absolute "
					src={bew}
					alt=""
					style={{
						width: "60vmin",
						top: "295vh",
						right: "13vw",
						borderTop: "20px solid white",
						boxSizing: "content-box",
					}}
				/>
				<img
					className="position-absolute "
					src={prod}
					alt=""
					style={{
						width: "60vmin",
						top: "545vh",
						left: "52vw",
					}}
				/>
				<img
					className="position-absolute "
					src={lab}
					alt=""
					style={{
						width: "60vmin",
						top: "815vh",
						right: "13vw",
						boxSizing: "content-box",
					}}
				/>
				<img
					className="position-absolute "
					src={video}
					alt=""
					style={{
						width: "50vmin",
						top: "935vh",
						left: "15vw",
					}}
				/>
				<img
					className="position-absolute "
					src={glas}
					alt=""
					style={{
						width: "35vmin",
						top: "1070vh",
						right: "23vw",
						boxSizing: "content-box",
					}}
				/>
				<OddSection id="passfotos" scrollPerc={scrollPerc} title="PASSFOTOS" />
				<EvenSection
					id="bewerbung"
					scrollPerc={scrollPerc}
					title="BEWERBUNGSBILDER"
				/>
				<OddSection id="portraits" scrollPerc={scrollPerc} title="PORTRAITS" />
				<EvenSection
					id="produkte"
					scrollPerc={scrollPerc}
					title="FOTOPRODUKTE"
					handleClick={() => {
						setDialogType("Fotoprodukte");
						setShowDialog(true);
					}}
				/>
				<OddSection id="rahmen" scrollPerc={scrollPerc} title="BILDERRAHMEN" />
				<EvenSection id="labor" scrollPerc={scrollPerc} title="LABOR" />
				<OddSection id="video" scrollPerc={scrollPerc} title="VIDEOKASSETTEN" />
				<EvenSection id="glas" scrollPerc={scrollPerc} title="3D GLASFOTO" />
				<FinalSection />
				<ShoppingCart
					shoppingCartContent={shoppingCartContent}
					handleClick={() => {
						setDialogType("ShoppingCartDialog");
						setShowDialog(true);
					}}
				/>
				<Dialog
					show={showDialog}
					dialogType={dialogType}
					handleRedirect={setDialogType}
					handleClose={() => setShowDialog(false)}
					handleItemAddition={updateShoppingCartContent}
					shoppingCartContent={shoppingCartContent}
				/>
			</div>
		</div>
	);
};

export default App;
