import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";

const ItemDialog = ({
	itemType,
	handleItemAddition,
	handleRedirect,
	pricelist,
	order,
	addItem,
}) => {
	console.log("pricelist[itemType]: ", pricelist, itemType);
	const [sizeOptions, setSizeOptions] = useState([
		"Wählen Sie bitte zuerst ein Produkt.",
	]);

	const changeSizeOptions = () => {
		if (pricelist[itemType].hasOwnProperty(nameRef.current.value)) {
			setSizeOptions(Object.keys(pricelist[itemType][nameRef.current.value]));
			sizeRef = {
				current: {
					value: Object.keys(pricelist[itemType][nameRef.current.value])[0],
				},
			};
		} else {
			setSizeOptions(["Wählen Sie bitte zuerst ein Produkt."]);
		}
	};

	const [price, setPrice] = useState(null);
	const changePrice = () => {
		if (
			pricelist[itemType].hasOwnProperty(nameRef.current.value) &&
			pricelist[itemType][nameRef.current.value].hasOwnProperty(
				sizeRef.current.value
			) &&
			numberRef.current.value
		) {
			setPrice(
				Math.round(
					pricelist[itemType][nameRef.current.value][sizeRef.current.value] *
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
	let fileRef = useRef({ current: null });
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
						{...Object.keys(pricelist[itemType]).map((item) => (
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
					<Form.Control ref={fileRef} style={{ width: "70%" }} type="file" />
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
					onClick={() => {
						addItem({
							supertype: itemType,
							product: nameRef.current.value,
							type: sizeRef.current.value,
							amount: parseInt(numberRef.current.value),
							file: fileRef.current.files ? fileRef.current.files[0] : null,
						});
					}}
				>
					Zum Warenkorb hinzufügen
				</Button>
				<Button
					variant="primary"
					onClick={() => handleRedirect("ShoppingCartDialog")}
				>
					Warenkorb ansehen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ItemDialog;
