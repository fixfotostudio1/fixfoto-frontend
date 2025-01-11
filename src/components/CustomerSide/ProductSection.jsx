const ProductSection = ({
	sectionStyle,
	id,
	overTitle,
	title,
	mainText,
	callToAction,
	imageSource,
	imageStyle,
	handleClick,
}) => {
	return (
		<>
			<img src={imageSource} style={imageStyle} />
			<div id={id} className="m-0 p-0 max-vw-100" style={{ height: "130vh" }}>
				<div
					className="d-flex flex-column justify-content-center"
					style={sectionStyle}
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
							class="line-1"
							style={{
								marginRight: "-11px",
							}}
						></div>
						<div className="d-flex align-items-center">
							<i class="arrow right"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSection;
