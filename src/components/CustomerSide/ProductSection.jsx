const ProductSection = ({
	sectionStyle,
	id,
	overTitle,
	title,
	mainText,
	callToAction,
	imageSource,
	imageSide,
	imageStyle,
	handleClick,
}) => {
	return (
		<>
			<div
				id={id}
				className="d-none d-md-flex max-vw-100 justify-content-center align-items-center"
				style={{
					...sectionStyle,
					position: "absolute",
					left: 0,
					height: "100vh",
					width: "100vw",
					margin: "0",
					padding: "0",
				}}
			>
				<img
					src={imageSource}
					style={{
						...imageStyle,
						objectFit: "contain",
						marginRight: "2.5vw",
						display: imageSide === "left" ? "unset" : "none",
					}}
				/>
				<div
					className="d-flex flex-column justify-content-center"
					style={{
						marginLeft: imageSide === "left" ? "2.5vw" : "0vw",
						marginRight: imageSide === "left" ? "0vw" : "2.5vw",
					}}
				>
					<h5
						style={{
							color: "white",
							fontSize: "16px",
							marginBottom: "10px",
						}}
					>
						<b>{overTitle}</b>
					</h5>
					<h1
						style={{
							color: "white",
							fontSize: "50px",
							marginBottom: "20px",
						}}
					>
						<b>{title}</b>
					</h1>
					<p
						className="service-description"
						style={{
							maxWidth: "70%",
							marginBottom: "0px",
						}}
					>
						{mainText}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "70%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
						onClick={handleClick}
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
							<b>{callToAction}</b>
						</h5>
						<div
							className="line-1"
							style={{
								marginRight: "-11px",
							}}
						></div>
						<div className="d-flex align-items-center">
							<i className="arrow right"></i>
						</div>
					</div>
				</div>
				<img
					src={imageSource}
					style={{
						...imageStyle,
						objectFit: "contain",
						marginLeft: "2.5vw",
						display: imageSide === "left" ? "none" : "unset",
					}}
				/>
			</div>
			<div
				id={id}
				className="d-flex flex-column d-md-none max-vw-100 justify-content-center align-items-center"
				style={{
					...sectionStyle,
					position: "absolute",
					left: 0,
					height: "100vh",
					width: "100vw",
					margin: "0",
					padding: "0",
				}}
			>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<h5
						style={{
							color: "white",
							fontSize: "16px",
							marginBottom: "10px",
						}}
					>
						<b>{overTitle}</b>
					</h5>
					<h1
						style={{
							color: "white",
							fontSize: "50px",
							marginBottom: "20px",
						}}
					>
						<b>{title}</b>
					</h1>
					<img
						src={imageSource}
						style={{
							...imageStyle,
							objectFit: "contain",
							paddingBottom: "20px",
						}}
					/>
					<p
						className="service-description"
						style={{
							maxWidth: "70%",
							marginBottom: "0px",
						}}
					>
						{mainText}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "70%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
						onClick={handleClick}
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
							<b>{callToAction}</b>
						</h5>
						<div
							className="line-1"
							style={{
								marginRight: "-11px",
							}}
						></div>
						<div className="d-flex align-items-center">
							<i className="arrow right"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSection;
