import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const PriceCard = ({
	productType,
	productSubtypesAvailable,
	modifiedPricelist,
	setModifiedPricelist,
}) => {
	if (!productSubtypesAvailable) {
		return (
			<Card.Body className="mb-5">
				<Card.Title>{productType.toUpperCase()}</Card.Title>
				{...Object.keys(modifiedPricelist[productType]).map((item) => (
					<Form.Group className="d-flex justify-content-start align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0, width: "70%" }}>
							{item}
						</Form.Label>
						<Form.Control
							style={{ width: "30%" }}
							value={modifiedPricelist[productType][item]}
							onChange={({ target }) => {
								const temp = {
									...modifiedPricelist[productType],
								};
								temp[item] = Number(target.value);
								const newestPricelist = { ...modifiedPricelist };
								newestPricelist[productType] = temp;
								setModifiedPricelist({ ...newestPricelist });
							}}
						/>
					</Form.Group>
				))}
			</Card.Body>
		);
	} else {
		const productSubtypes = Object.keys(modifiedPricelist[productType]);
		let arr = productSubtypes.map((productSubtype) => [
			...Object.keys(modifiedPricelist[productType][productSubtype]).map(
				(item) => (
					<Form.Group className="d-flex justify-content-between align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0, width: "70%" }}>
							{productSubtype + ", " + item}
						</Form.Label>
						<Form.Control
							style={{ width: "30%" }}
							value={modifiedPricelist[productType][productSubtype][item]}
							onChange={({ target }) => {
								const temp = {
									...modifiedPricelist[productType][productSubtype],
								};
								temp[item] = Number(target.value);
								const newestPricelist = { ...modifiedPricelist };
								newestPricelist[productType][productSubtype] = temp;
								setModifiedPricelist({ ...newestPricelist });
							}}
						/>
					</Form.Group>
				)
			),
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
