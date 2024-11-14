const ShoppingCart = ({ shoppingCartContent, handleClick }) => {
	const itemCount = shoppingCartContent.reduce(
		(acc, item) => acc + item.number,
		0
	);
	const totalPrice = shoppingCartContent.reduce(
		(acc, item) => acc + item.price * item.number,
		0
	);

	if (itemCount !== 0) {
		return (
			<div onClick={handleClick} style={{ cursor: "pointer" }}>
				<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{
						position: "fixed",
						bottom: 0,
						right: "0",
						marginRight: "50px",
						marginBottom: "50px",
						width: "10vw",
						height: "10vh",
					}}
				>
					<p className="shopping-cart-item">{itemCount} Artikel</p>
					<p className="shopping-cart-item" style={{ fontWeight: "bold" }}>
						{totalPrice} EUR
					</p>
				</div>
				<svg
					width="10vw"
					height="10vh"
					style={{
						position: "fixed",
						bottom: 0,
						right: "0",
						marginRight: "50px",
						marginBottom: "50px",
					}}
				>
					<rect
						x="0"
						y="0"
						width="10vw"
						height="10vh"
						stroke="white"
						fill="none"
						strokeWidth="2px"
						stroke-dasharray="130"
						stroke-dashoffset="0"
						id="animated-rect"
					></rect>
				</svg>
			</div>
		);
	} else {
		return <></>;
	}
};

export default ShoppingCart;
