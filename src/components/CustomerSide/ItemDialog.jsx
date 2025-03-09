import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";

const ItemDialog = ({
	handleRedirect,
	itemType,
	pricelist,
	addItem,
	cancelIntent,
}) => {
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

	let nameRef = useRef({ current: { value: null } });
	let sizeRef = useRef({ current: { value: null } });
	let numberRef = useRef({ current: { value: null } });
	let fileRef = useRef({ current: { files: null } });

	const [message, setMessage] = useState(<></>);

	const findInvalidFields = () => {
		let invalidFields = [];
		if (nameRef.current.value.startsWith("Wählen")) {
			invalidFields.push("Druckart");
			invalidFields.push("Größe");
		}
		if (!Boolean(parseInt(numberRef.current.value))) {
			invalidFields.push("Anzahl");
		}
		if (fileRef.current.files.length === 0) {
			invalidFields.push("Datei");
		}
		return invalidFields;
	};

	const [keys, setKeys] = useState({
		type: `${Date.now().toString(16)}-t`,
		subtype: `${Date.now().toString(16)}-s`,
		amount: `${Date.now().toString(16)}-a`,
		file: `${Date.now().toString(16)}-f`,
	});

	const reset = () => {
		setKeys({
			type: `${Date.now().toString(16)}-t`,
			subtype: `${Date.now().toString(16)}-s`,
			amount: `${Date.now().toString(16)}-a`,
			file: `${Date.now().toString(16)}-f`,
		});
		setPrice(null);
		setSizeOptions(["Wählen Sie bitte zuerst ein Produkt."]);
	};

	const computeInputField = (label) => {
		let field = <></>;
		switch (label) {
			case "Druckart":
				field = (
					<Form.Select
						key={keys["type"]}
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
				);
				break;
			case "Größe":
				field = (
					<Form.Select
						key={keys["subtype"]}
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
				);
				break;
			case "Anzahl":
				field = (
					<Form.Control
						key={keys["amount"]}
						style={{ width: "70%" }}
						type="number"
						ref={numberRef}
						defaultValue={1}
						min={1}
						onChange={() => {
							changePrice();
						}}
					/>
				);
				break;
			case "Datei":
				field = (
					<Form.Control
						key={keys["file"]}
						ref={fileRef}
						style={{ width: "70%" }}
						type="file"
					/>
				);
				break;
		}
		return (
			<Form.Group className="d-flex justify-content-between align-items-center">
				<Form.Label style={{ padding: 0, margin: 0 }}>{label}:</Form.Label>
				{field}
			</Form.Group>
		);
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>{itemType.toUpperCase().replace("-", " ")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{computeInputField("Druckart")}
				{computeInputField("Größe")}
				{computeInputField("Anzahl")}
				{computeInputField("Datei")}
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
							€{price}
						</h4>
					</div>
				) : (
					""
				)}
			</Modal.Body>
			{message}
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						if (findInvalidFields().length === 0) {
							setMessage(
								<Modal.Body style={{ backgroundColor: "rgba(0, 255, 0, 0.3)" }}>
									<p style={{ padding: 0, margin: 0 }}>
										Ihr Artikel befindet sich im Warenkorb.
									</p>
								</Modal.Body>
							);
							addItem({
								supertype: itemType,
								product: nameRef.current.value,
								type: sizeRef.current.value,
								amount: parseInt(numberRef.current.value),
								file: fileRef.current.files ? fileRef.current.files[0] : null,
								S3TempName: Date.now().toString(),
							});
							cancelIntent();
							setTimeout(setMessage, 3000, <></>);
							reset();
						} else {
							setMessage(
								<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
									<p style={{ padding: 0, margin: 0 }}>
										Sie müssen <b>{`${findInvalidFields().join(", ")}`}</b>{" "}
										angeben, um ein Artikel zum Warenkorb hinzuzufügen.
									</p>
								</Modal.Body>
							);
						}
					}}
				>
					Zum Warenkorb hinzufügen
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						handleRedirect("CartAndCheckoutDialog");
					}}
				>
					Warenkorb ansehen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ItemDialog;
