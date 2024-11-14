import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const priceList = {
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
};

const Dialog = ({
	show,
	content,
	handleClose,
	handleRedirect,
	handleItemAddition,
}) => {
	const [groessen, setGroessen] = useState(["Wählen Sie zuerst ein Produkt."]);

	const [price, setPrice] = useState(0);

	const changeGroessen = (produkt) => {
		console.log("produkt: ", produkt);
		setGroessen(Object.keys(priceList[produkt]));
	};

	const changePrice = (produkt, size, number) => {
		if (produkt && size && number) {
			setPrice(priceList[produkt][size] * number);
		} else {
			setPrice(0);
		}
	};

	const nameRef = useRef({ current: null });
	const sizeRef = useRef({ current: null });
	const numberRef = useRef({ current: null });

	const renderedContent = {
		fotoprodukte: (
			<>
				<Modal.Header closeButton>
					<Modal.Title>Fotoprodukte</Modal.Title>
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
							<option value="Poster (Glanz)">Poster (Glanz)</option>
							<option value="Poster (Matt)">Poster (Matt)</option>
							<option value="Leinen auf Keilrahmen">
								Leinen auf Keilrahmen
							</option>
							<option value="Tassendruck">Tassendruck</option>
							<option value="Kissendruck">Kissendruck</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="d-flex justify-content-between align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0 }}>Größe:</Form.Label>
						<Form.Select
							ref={sizeRef}
							disabled={groessen.length === 1}
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
							{...groessen.map((item) => <option value={item}>{item}</option>)}
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
					<Button variant="primary" onClick={() => handleRedirect("personal")}>
						Bestellen
					</Button>
				</Modal.Footer>
			</>
		),
		personal: (
			<>
				<Modal.Header closeButton>
					<Modal.Title>Ihre Daten</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="d-flex justify-content-between align-items-center">
						<Form.Label style={{ padding: 0, margin: 0 }}>Vorname:</Form.Label>
						<Form.Control style={{ width: "70%" }} type="text" />
					</Form.Group>
					<Form.Group className="d-flex justify-content-between align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0 }}>Nachname:</Form.Label>
						<Form.Control style={{ width: "70%" }} type="text" />
					</Form.Group>
					<Form.Group className="d-flex justify-content-between align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0 }}>Mobil:</Form.Label>
						<Form.Control style={{ width: "70%" }} />
					</Form.Group>
					<Form.Group className="d-flex justify-content-between align-items-center mt-3">
						<Form.Label style={{ padding: 0, margin: 0 }}>Email:</Form.Label>
						<Form.Control style={{ width: "70%" }} type="email" />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">Zurück zum Warenkorb</Button>
					<Button variant="primary" onClick={handleClose}>
						Bezahlen
					</Button>
				</Modal.Footer>
			</>
		),
		warenkorb: (
			<>
				<Modal.Header closeButton>
					<Modal.Title>Warenkorb</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Weiter einkaufen
					</Button>
					<Button variant="primary" onClick={() => handleRedirect("personal")}>
						Bestellen
					</Button>
				</Modal.Footer>
			</>
		),
	};

	return (
		<Modal show={show} onHide={handleClose} animation={true} centered>
			{renderedContent[content]}
		</Modal>
	);
};

export default Dialog;
