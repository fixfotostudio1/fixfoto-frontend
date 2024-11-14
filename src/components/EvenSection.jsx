const EvenSection = ({ id, scrollPerc, title, handleClick }) => {
	//<p style={{ color: "white" }}>{`HELLO ${scrollPerc}%`}</p>;
	return (
		<div id={id} className="m-0 p-0 max-vw-100" style={{ height: "130vh" }}>
			<div
				className="d-flex flex-column justify-content-center"
				style={{
					margin: "0",
					marginLeft: "20%",
					height: "100vh",
					marginRight: "31%",
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
	);
};

export default EvenSection;
