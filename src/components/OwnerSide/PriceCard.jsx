import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const PriceCard = ({
	productType,
	productSubtypesAvailable,
	newPricelist,
	setNewPricelist,
}) => {
	if (!productSubtypesAvailable) {
		return (
			<Card.Body className="mb-5">
				<Card.Title>{productType.toUpperCase()}</Card.Title>
				{...Object.keys(newPricelist[productType]).map((item) => (
					<Form.Group className="d-flex justify-content-start align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0, width: "70%" }}>
							{item}
						</Form.Label>
						<Form.Control
							style={{ width: "30%" }}
							value={newPricelist[productType][item]}
							onChange={({ target }) => {
								const temp = {
									...newPricelist[productType],
								};
								temp[item] = Number(target.value);
								const newestPricelist = { ...newPricelist };
								newestPricelist[productType] = temp;
								setNewPricelist({ ...newestPricelist });
							}}
						/>
					</Form.Group>
				))}
			</Card.Body>
		);
	} else {
		const productSubtypes = Object.keys(newPricelist[productType]);
		let arr = productSubtypes.map((productSubtype) => [
			...Object.keys(newPricelist[productType][productSubtype]).map((item) => (
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0, width: "70%" }}>
						{productSubtype + ", " + item}
					</Form.Label>
					<Form.Control
						style={{ width: "30%" }}
						value={newPricelist[productType][productSubtype][item]}
						onChange={({ target }) => {
							const temp = {
								...newPricelist[productType][productSubtype],
							};
							temp[item] = Number(target.value);
							const newestPricelist = { ...newPricelist };
							newestPricelist[productType][productSubtype] = temp;
							setNewPricelist({ ...newestPricelist });
						}}
					/>
				</Form.Group>
			)),
		]);
		arr = arr.reduce((acc, val) => acc.concat(val), []);

		return (
			<Card.Body className="mb-5">
				<Card.Title>{productType.toUpperCase()}</Card.Title>
				{...arr}
			</Card.Body>
		);
	}
};

export default PriceCard;
