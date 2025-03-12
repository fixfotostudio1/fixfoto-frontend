import owner from "../../assets/owner.jpg";

const FinalSection = ({ handleClick, sectionSize }) => {
	return (
		<div
			id="final"
			className="m-0 p-0 max-vw-100 d-flex flex-column justify-content-center align-items-center"
			style={{
				position: "absolute",
				top: `${10 * sectionSize}vh`,
				width: "100vw",
				height: `${sectionSize}vh`,
			}}
		>
			<div
				className="d-flex justify-content-center"
				style={{
					paddingTop: "50vh",
					paddingBottom: "20vh",
					width: "fit-content",
				}}
			>
				<img
					src={owner}
					style={{ height: "40vh", border: "3px solid white" }}
				/>
			</div>
			<div
				id={"final-section"}
				className="d-flex justify-content-center align-items-center p-0 m-5"
				style={{
					width: "100vw",
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
	);
};

export default FinalSection;
