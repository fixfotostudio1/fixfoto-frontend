const FinalSection = ({ handleClick }) => {
	return (
		<div
			id="final"
			className="m-0 p-0 max-vw-100 d-flex flex-column justify-content-end align-items-center"
			style={{
				position: "absolute",
				top: "1000vh",
				width: "100vw",
				height: "100vh",
			}}
		>
			<div
				id={"final-section"}
				className="d-flex justify-content-center align-items-center"
				style={{
					width: "100vw",
					height: "100vh",
				}}
			>
				<p
					className="p-0 pe-5 info-p"
					style={{ color: "white" }}
					onClick={() => handleClick("AGBDialog")}
				>
					AGB
				</p>
				<p
					className="p-0 pe-5 info-p"
					style={{ color: "white" }}
					onClick={() => handleClick("ImpressumDialog")}
				>
					Impressum
				</p>
				<p
					className="p-0 info-p"
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
