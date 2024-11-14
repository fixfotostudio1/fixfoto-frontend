import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";

const priceList = {
	Fotoprodukte: {
		"Poster (Glanz)": {
			"30 x 30": 17.9,
			"30 x 40": 19.9,
			"30 x 45": 21.9,
			"40 x 40": 24.9,
			"40 x 50": 27.9,
			"40 x 60": 29.9,
			"50 x 50": 34.9,
			"50 x 60": 39.9,
			"50 x 70": 44.9,
		},
		"Poster (Matt)": {
			"30 x 30": 17.9,
			"30 x 40": 19.9,
			"30 x 45": 21.9,
			"40 x 40": 24.9,
			"40 x 50": 27.9,
			"40 x 60": 29.9,
			"50 x 50": 34.9,
			"50 x 60": 39.9,
			"50 x 70": 44.9,
		},
		"Leinen auf Keilrahmen": {
			"30 x 30": 34.9,
			"30 x 40": 39.9,
			"30 x 45": 39.9,
			"40 x 40": 44.9,
			"40 x 50": 49.9,
			"40 x 60": 54.9,
			"50 x 50": 59.9,
			"50 x 60": 64.9,
			"50 x 70": 69.9,
		},
		Tassendruck: {
			"Verschiedene Farben": 19.9,
			Magic: 24.9,
		},
		Kissendruck: {
			"Verschiedene Farben": 24.9,
		},
	},
};

const ItemDialog = ({ itemType, handleItemAddition, handleRedirect }) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedNumber, setSelectedNumber] = useState(null);

	const [groessen, setGroessen] = useState([]);

	const [price, setPrice] = useState(0);

	const changeGroessen = (produkt) => {
		console.log("produkt: ", itemType, produkt);
		setGroessen(Object.keys(priceList[itemType][produkt]));
	};

	const changePrice = (produkt, size, number) => {
		console.log("produkt, size, number: ", produkt, size, number);
		if (
			produkt !== "Wählen" &&
			size !== "Wählen Sie bitte zuerst ein Produkt..." &&
			number
		) {
			setPrice(priceList[itemType][produkt][size] * number);
		} else {
			setPrice(0);
		}
	};

	const nameRef = useRef({ current: null });
	const sizeRef = useRef({ current: null });
	const numberRef = useRef({ current: null });
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{itemType}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="d-flex justify-content-between align-items-center">
					<Form.Label style={{ padding: 0, margin: 0 }}>Druckart:</Form.Label>
					<Form.Select
						ref={nameRef}
						aria-label="Default select example"
						style={{ width: "70%" }}
						onChange={() => {
							changeGroessen(nameRef.current.value);
							changePrice(
								nameRef.current.value,
								sizeRef.current.value,
								numberRef.current.value
							);
						}}
					>
						<option>Wählen...</option>
						{Object.keys(priceList[itemType]).map((item) => (
							<option value={item}>{item}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Größe:</Form.Label>
					<Form.Select
						ref={sizeRef}
						disabled={groessen.length <= 1}
						aria-label="Default select example"
						style={{ width: "70%" }}
						onChange={() =>
							changePrice(
								nameRef.current.value,
								sizeRef.current.value,
								numberRef.current.value
							)
						}
					>
						{groessen.length === 0 ? (
							<option value={null}>
								Wählen Sie bitte zuerst ein Produkt...
							</option>
						) : (
							groessen.map((item) => <option value={item}>{item}</option>)
						)}
					</Form.Select>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Anzahl:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						type="number"
						ref={numberRef}
						onChange={() =>
							changePrice(
								nameRef.current.value,
								sizeRef.current.value,
								numberRef.current.value
							)
						}
					/>
				</Form.Group>
				<Form.Group
					controlId="formFile"
					className="d-flex justify-content-between align-items-center mt-3"
				>
					<Form.Label style={{ padding: 0, margin: 0 }}>Foto:</Form.Label>
					<Form.Control style={{ width: "70%" }} type="file" />
				</Form.Group>
				<div className="d-flex justify-content-between align-items-center mt-5">
					<p style={{ padding: 0, margin: 0, color: "white" }}>Preis:</p>
					<h4
						style={{
							padding: 0,
							margin: 0,
							width: "68%",
						}}
					>
						{price}€
					</h4>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() =>
						handleItemAddition({
							name: nameRef.current.value,
							price: priceList[nameRef.current.value][sizeRef.current.value],
							number: parseInt(numberRef.current.value),
						})
					}
				>
					Zum Warenkorb hinzufügen
				</Button>
				<Button
					variant="primary"
					onClick={() => handleRedirect("ContactDataDialog")}
				>
					Bestellen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ItemDialog;
