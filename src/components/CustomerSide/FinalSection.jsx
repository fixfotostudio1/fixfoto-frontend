import owner from "../../assets/owner.jpg";

const FinalSection = ({ sectionSize, handleClick }) => {
	const text =
		"Mein Name ist Cemal G. Eker. Alles hat damals in der Schule bei einem Filmprojekt angefangen. Ich fand das Fotografieren so faszinierend, dass ich meine berufliche Laufbahn ich in die Richtung lenken wollte. Seit über 40 Jahren arbeite ich als Fotograf und bin immer noch fasziniert von der Vielseitigkeit dieses Berufes und bin mit Leidenschaft noch dabei. Es macht mir einfach Spaß, gute Bilder zu printen oder Poster zu erstellen.";
	//console.log(generateText(id));
	return (
		<>
			<div
				id="final"
				className="d-none d-xl-flex max-vw-100 justify-content-center align-items-center m-0"
				style={{
					top: `${sectionSize * 10}vh`,
					position: "absolute",
					left: 0,
					height: `${sectionSize}vh`,
					width: "100vw",
					paddingLeft: "calc(3rem + 85.15px)",
					paddingRight: "calc(3rem + 157.64px)",
					boxSizing: "border-box",
				}}
			>
				<div
					className="d-flex flex-column justify-content-center"
					style={{
						marginTop: "40vh",
						marginLeft: "0vw",
						marginRight: "1.5vw",
						maxWidth: "60%",
					}}
				>
					<h1 className="section-title-text">{"IHR FOTOGRAF"}</h1>
					<p
						className="smallest-text-unit"
						style={{
							maxWidth: "100%",
							marginBottom: "0px",
						}}
					>
						{text}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "100%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
					>
						<h5
							style={{
								color: "white",
								fontSize: "16px",
								margin: "0",
								padding: "0",
								marginRight: "20px",
								minWidth: "fit-content",
							}}
						>
							<b>{}</b>
						</h5>
						<div
							id={"final-section"}
							className="d-flex justify-content-center align-items-center p-0 m-5"
							style={{
								width: "100%",
								height: "fit-content",
							}}
						>
							<p
								className="m-0 p-0 pe-5 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("AGBDialog")}
							>
								AGB
							</p>
							<p
								className="m-0 p-0 pe-5 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("ImpressumDialog")}
							>
								Impressum
							</p>
							<p
								className="m-0 p-0 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("DatenschutzDialog")}
							>
								Datenschutz
							</p>
						</div>
					</div>
				</div>
				<img
					src={owner}
					style={{
						marginTop: "30vh",
						width: "30%",
						maxHeight: "50vh",
						objectFit: "contain",
						marginLeft: "1.5vw",
						display: "unset",
					}}
				/>
			</div>
			<div
				id="final"
				className="d-flex flex-column d-xl-none max-vw-100 justify-content-center align-items-center"
				style={{
					top: `${sectionSize * 10}vh`,
					position: "absolute",
					left: 0,
					height: `${sectionSize}vh`,
					width: "100vw",
					boxSizing: "border-box",
				}}
			>
				<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{ marginTop: "30vh" }}
				>
					<h1
						className="section-title-text"
						style={{
							wordBreak: "break-all",
							textAlign: "center",
						}}
					>
						{"IHR FOTOGRAF"}
					</h1>
					<img
						src={owner}
						style={{
							width: "20vw",
							objectFit: "contain",
							marginBottom: "20px",
						}}
					/>
					<p
						className="smallest-text-unit"
						style={{
							maxWidth: "70%",
							marginBottom: "0px",
						}}
					>
						{text}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "70%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
					>
						<h5
							style={{
								color: "white",
								fontSize: "16px",
								margin: "0",
								padding: "0",
								marginRight: "20px",
							}}
						>
							<b>{}</b>
						</h5>
						<div
							id={"final-section"}
							className="d-flex justify-content-center align-items-center p-0 mt-5"
							style={{
								width: "100%",
								height: "fit-content",
							}}
						>
							<p
								className="m-0 p-0 pe-5 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("AGBDialog")}
							>
								AGB
							</p>
							<p
								className="m-0 p-0 pe-5 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("ImpressumDialog")}
							>
								Impressum
							</p>
							<p
								className="m-0 p-0 info-p"
								style={{ color: "white" }}
								onClick={() => handleClick("DatenschutzDialog")}
							>
								Datenschutz
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FinalSection;
