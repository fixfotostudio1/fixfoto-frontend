import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { DashboardContext } from "./OwnerSide";

const PriceCard = ({ productSupertype }) => {
	const ctx = useContext(DashboardContext);
	const productSubtypesAvailable =
		typeof ctx.modifiedPricelist[productSupertype][
			Object.keys(ctx.modifiedPricelist[productSupertype])[0]
		] === "object";
	let content = "";
	const productTypes = Object.keys(ctx.modifiedPricelist[productSupertype]);
	const productSubtypes = (type) => {
		return Object.keys(ctx.modifiedPricelist[productSupertype][type]);
	};
	const computeInputField = (type, subtype) => {
		const label = subtype ? type + ", " + subtype : type;
		const value = subtype
			? ctx.modifiedPricelist[productSupertype][type][subtype]
			: ctx.modifiedPricelist[productSupertype][type];
		const onChange = ({ target }) => {
			const temp = subtype
				? {
						...ctx.modifiedPricelist[productSupertype][type],
				  }
				: {
						...ctx.modifiedPricelist[productSupertype],
				  };
			if (subtype) {
				temp[subtype] = target.value;
			} else {
				temp[type] = target.value;
			}
			const newestPricelist = { ...ctx.modifiedPricelist };
			if (subtype) {
				newestPricelist[productSupertype][type] = temp;
			} else {
				newestPricelist[productSupertype] = temp;
			}
			ctx.setModifiedPricelist({ ...newestPricelist });
		};
		return (
			<Form.Group className="d-flex justify-content-start align-items-center mt-3">
				<Form.Label style={{ padding: 0, margin: 0, width: "70%" }}>
					{label}
				</Form.Label>
				<Form.Control
					style={{ width: "30%" }}
					value={value}
					onChange={onChange}
				/>
			</Form.Group>
		);
	};
	if (!productSubtypesAvailable) {
		content = (
			<>{...productTypes.map((type) => computeInputField(type, null))}</>
		);
	} else {
		content = productTypes.map((type) => [
			...productSubtypes(type).map((subtype) =>
				computeInputField(type, subtype)
			),
		]);
		content = content.reduce((acc, val) => acc.concat(val), []);
		content = <>{...content}</>;
	}
	return (
		<Card.Body className="mb-5">
			<Card.Title>{productSupertype.toUpperCase()}</Card.Title>
			{content}
		</Card.Body>
	);
};

export default PriceCard;
