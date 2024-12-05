const OddSection = ({ id, scrollPerc, title, handleClick, items }) => {
	//<p style={{ color: "white" }}>{`HELLO ${scrollPerc}%`}</p>;
	let mainText;
	if (items) {
		mainText = () => (
			<p
				className="service-description"
				style={{
					maxWidth: "70%",
					marginBottom: "0px",
				}}
			>
				{...Object.keys(items).map((item) => (
					<>
						{item + ": " + items[item] + " EUR"} <br />
					</>
				))}
			</p>
		);
	} else {
		mainText = () => (
			<p
				className="service-description"
				style={{
					maxWidth: "70%",
					marginBottom: "0px",
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
				doloremque! Quasi, vel molestiae? Porro quis soluta quod alias nihil.
				Quisquam, consequatur distinctio. Non animi iusto excepturi modi alias
				eaque ipsam?
			</p>
		);
	}
	return (
		<div id={id} className="m-0 p-0 max-vw-100" style={{ height: "130vh" }}>
			<div
				className="d-flex flex-column justify-content-center"
				style={{
					margin: "0",
					marginLeft: "51%",
					height: "100vh",
				}}
			>
				<h5
					style={{
						color: "white",
						fontSize: "16px",
						marginBottom: "10px",
					}}
				>
					<b>LOREM IPSUM</b>
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
				{mainText()}
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
						<b>BESTELLEN</b>
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
	);
};

export default OddSection;
