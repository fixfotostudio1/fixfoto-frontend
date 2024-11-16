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
	const [sizeOptions, setSizeOptions] = useState([
		"Wählen Sie bitte zuerst ein Produkt.",
	]);

	const changeSizeOptions = () => {
		if (priceList[itemType].hasOwnProperty(nameRef.current.value)) {
			setSizeOptions(Object.keys(priceList[itemType][nameRef.current.value]));
			console.log(
				"sizeRef before: ",
				sizeRef.current.value,
				Object.keys(priceList[itemType][nameRef.current.value])[0]
			);
			sizeRef = {
				current: {
					value: Object.keys(priceList[itemType][nameRef.current.value])[0],
				},
			};
			console.log("sizeRef after: ", sizeRef.current.value);
		} else {
			setSizeOptions(["Wählen Sie bitte zuerst ein Produkt."]);
		}
	};

	const [price, setPrice] = useState(null);
	const changePrice = () => {
		if (
			priceList[itemType].hasOwnProperty(nameRef.current.value) &&
			priceList[itemType][nameRef.current.value].hasOwnProperty(
				sizeRef.current.value
			) &&
			numberRef.current.value
		) {
			setPrice(
				Math.round(
					priceList[itemType][nameRef.current.value][sizeRef.current.value] *
						numberRef.current.value *
						100
				) / 100
			);
		} else {
			setPrice(null);
		}
	};

	let nameRef = useRef({ current: null });
	let sizeRef = useRef({ current: null });
	let numberRef = useRef({ current: null });
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
							changeSizeOptions();
							changePrice();
						}}
					>
						<option>Wählen...</option>
						{...Object.keys(priceList[itemType]).map((item) => (
							<option value={item}>{item}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Größe:</Form.Label>
					<Form.Select
						ref={sizeRef}
						disabled={sizeOptions.length === 1}
						aria-label="Default select example"
						style={{ width: "70%" }}
						onChange={() => {
							changePrice();
						}}
					>
						{...sizeOptions.map((size) => <option value={size}>{size}</option>)}
					</Form.Select>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Anzahl:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						type="number"
						ref={numberRef}
						onChange={() => {
							changePrice();
						}}
					/>
				</Form.Group>
				<Form.Group
					controlId="formFile"
					className="d-flex justify-content-between align-items-center mt-3"
				>
					<Form.Label style={{ padding: 0, margin: 0 }}>Foto:</Form.Label>
					<Form.Control style={{ width: "70%" }} type="file" />
				</Form.Group>
				{price ? (
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
				) : (
					""
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() =>
						handleItemAddition({
							name: nameRef.current.value,
							size: sizeRef.current.value,
							price:
								priceList[itemType][nameRef.current.value][
									sizeRef.current.value
								],
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
