const TitleSection = () => {
	return (
		<div id="start" className="m-0 p-0 max-vw-100" style={{ height: "130vh" }}>
			<div
				className="d-flex flex-column"
				style={{
					margin: "0",
					marginLeft: "20%",
					marginRight: "20%",
					height: "100vh",
					padding: 0,
					paddingTop: "38vh",
				}}
			>
				<div
					className="d-flex align-items-center"
					style={{
						color: "white",
						fontSize: "16px",
						marginBottom: "10px",
					}}
				>
					<span className="material-symbols-outlined">location_on</span>
					<h5
						style={{
							color: "white",
							fontSize: "16px",
							margin: 0,
							padding: 0,
							marginLeft: "10px",
						}}
					>
						<b>Grüneburgweg 8, 60322 Frankfurt am Main</b>
					</h5>
				</div>
				<h1
					style={{
						color: "white",
						fontSize: "50px",
						marginBottom: "20px",
					}}
				>
					<b>FIX FOTO STUDIO</b>
				</h1>
				<p
					style={{
						color: "white",
						fontSize: "25px",
						marginBottom: "20px",
					}}
				>
					<b>Mo. - Fr. 09:00 - 18:30</b>
					<br />
					<b>Sa. 09:00 - 14:00</b>
				</p>
				<div
					className="d-flex align-items-center arrow-container"
					style={{
						maxWidth: "70%",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					{" "}
					<i
						className="fa fa-envelope"
						style={{ fontSize: "24px", color: "white" }}
					></i>
					<p
						style={{
							color: "white",
							fontSize: "16px",
							margin: "0",
							padding: "0",
							marginRight: "20px",
							marginLeft: "10px",
						}}
					>
						<b>fix-foto-studio1@gmx.de</b>
					</p>
				</div>
				<div
					className="d-flex align-items-center arrow-container"
					style={{
						maxWidth: "70%",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					{" "}
					<i
						className="fa fa-phone"
						style={{ fontSize: "24px", color: "white" }}
					></i>
					<p
						style={{
							color: "white",
							fontSize: "16px",
							margin: "0",
							padding: "0",
							marginRight: "20px",
							marginLeft: "10px",
						}}
					>
						<b>0179 / 109 72 70</b>
					</p>
				</div>
				<div
					className="d-flex align-items-center arrow-container"
					style={{
						maxWidth: "70%",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					{" "}
					<i
						className="fa fa-instagram"
						style={{ fontSize: "24px", color: "white" }}
					></i>
					<p
						style={{
							color: "white",
							fontSize: "16px",
							margin: "0",
							padding: "0",
							marginRight: "20px",
							marginLeft: "10px",
						}}
					>
						<b>@fixfotostudio1</b>
					</p>
				</div>
			</div>
		</div>
	);
};

export default TitleSection;
