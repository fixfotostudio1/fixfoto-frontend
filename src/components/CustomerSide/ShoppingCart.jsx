const ShoppingCart = ({ order, handleClick }) => {
	const itemCount = order.items.length;

	if (itemCount !== 0) {
		return (
			<div
				className="d-flex position-fixed justify-content-end vw-100 vh-10"
				onClick={handleClick}
				style={{ cursor: "pointer", bottom: 0 }}
			>
				<div>
					<div
						className="d-flex flex-column justify-content-center align-items-center mb-3 me-3 mb-lg-5 me-lg-5 position-fixed"
						style={{
							width: "157px",
							height: "10vh",
						}}
					>
						<p className="shopping-cart-item" style={{ fontWeight: "bold" }}>
							{itemCount} Artikel
						</p>
						<p className="shopping-cart-item" style={{ paddingTop: "5px" }}>
							im
						</p>
						<p className="shopping-cart-item" style={{ paddingTop: "5px" }}>
							Warenkorb
						</p>
					</div>
					<svg
						width="157px"
						height="10vh"
						className="mb-3 me-3 mb-lg-5 me-lg-5"
					>
						<rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							stroke="white"
							fill="none"
							strokeWidth="2px"
							strokeDasharray="130"
							strokeDashoffset="0"
							id="animated-rect"
						></rect>
					</svg>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export default ShoppingCart;
