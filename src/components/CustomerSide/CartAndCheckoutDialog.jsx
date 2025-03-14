import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useRef, useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Big } from "bigdecimal.js";

const CartAndCheckoutDialog = ({
	AGBAgreement,
	setAGBAgreement,
	handleClose,
	order,
	pricelist,
	changeAmount,
	deleteItem,
	changeOrderNumber,
	changeDeliveryAddress,
	changeDeliveryType,
	clientSecret,
	fetchClientSecret,
	alwaysActiveList,
	toggleActivity,
	cancelIntent,
	handleRedirect,
}) => {
	let AGBCheckboxRef = useRef({ current: { checked: null } });

	let stripe = null;
	let elements = null;
	if (clientSecret) {
		stripe = useStripe();
		elements = useElements();
	}
	const [errorMessage, setErrorMessage] = useState(<></>);
	const showFormGaps = () => {
		if (order["items"].length === 0) {
			return (
				<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
					<p style={{ padding: 0, margin: 0 }}>Ihr Warenkorb ist leer.</p>
				</Modal.Body>
			);
		} else if (
			order["items"].filter((item) => item["amount"] === "").length !== 0
		) {
			return (
				<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
					<p style={{ padding: 0, margin: 0 }}>
						Zu einem oder mehreren der Produkte in Ihrem Warenkorb haben Sie
						eine ungültige Menge angegeben.
					</p>
				</Modal.Body>
			);
		} else if (checkInvalidDeliveryFields().length > 0) {
			return (
				<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
					<p style={{ padding: 0, margin: 0 }}>
						Sie müssen <b>{`${checkInvalidDeliveryFields().join(", ")}`}</b>{" "}
						unter "Kontaktdaten" angeben.
					</p>
				</Modal.Body>
			);
		} else {
			return "";
		}
	};

	const submitPayment = async () => {
		if (!stripe || !elements) {
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:5174/after_payment_attempt",
			},
		});

		if (error) {
			setErrorMessage(
				<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
					<p style={{ padding: 0, margin: 0 }}>{error.message}</p>
				</Modal.Body>
			);
		} else {
			console.log("submitPayment");
		}
	};

	const checkInvalidDeliveryFields = () => {
		let invalidFields = [];
		if (!order["deliveryAddress"]["firstName"]) {
			invalidFields.push("Vorname");
		}
		if (!order["deliveryAddress"]["surname"]) {
			invalidFields.push("Nachname");
		}
		if (!order["deliveryAddress"]["mobile"]) {
			invalidFields.push("Mobil");
		}
		if (!order["deliveryAddress"]["email"]) {
			invalidFields.push("Email-Adresse");
		}
		if (
			order["deliveryType"] !== "Abholen" &&
			!order["deliveryAddress"]["street"]
		) {
			invalidFields.push("Straße");
		}
		if (
			order["deliveryType"] !== "Abholen" &&
			!order["deliveryAddress"]["houseNumber"]
		) {
			invalidFields.push("Hausnummer");
		}
		if (
			order["deliveryType"] !== "Abholen" &&
			!order["deliveryAddress"]["ZIPCode"]
		) {
			invalidFields.push("Postzahl");
		}
		if (
			order["deliveryType"] !== "Abholen" &&
			!order["deliveryAddress"]["city"]
		) {
			invalidFields.push("Stadt");
		}
		return invalidFields;
	};

	const subtotal = order["items"].reduce(
		(acc, item) =>
			Big(pricelist[item["supertype"]][item["product"]][item["type"]])
				.multiply(item["amount"].toString())
				.add(acc),
		Big("0")
	);

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Bearbeiten & bestellen</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Accordion defaultActiveKey={alwaysActiveList} alwaysOpen>
					<Accordion.Item eventKey="0">
						<Accordion.Header onClick={() => toggleActivity("0")}>
							Warenkorb
						</Accordion.Header>
						<Accordion.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th style={{ minWidth: "fit-content" }}>Artikel</th>
										<th style={{ minWidth: "fit-content" }}>Datei</th>
										<th style={{ minWidth: "fit-content" }}>Anzahl</th>
										<th style={{ minWidth: "fit-content" }}>Preis</th>
									</tr>
								</thead>
								<tbody>
									{...order["items"].map((item, index) => (
										<tr>
											<td>
												{item["product"]}, {item["type"]}
											</td>
											<td>{item["file"].name}</td>
											<td className="align-middle">
												<div className="d-flex align-items-center justify-content-center">
													<Form.Group className="d-flex justify-content-between align-items-center">
														<Form.Control
															type="number"
															value={order["items"][index]["amount"]}
															style={{
																maxWidth: "80%",
																backgroundColor:
																	order["items"][index]["amount"] === ""
																		? "rgba(255, 0, 0, 0.3)"
																		: "",
															}}
															onChange={({ target }) => {
																changeAmount(index, target.value);
																cancelIntent();
															}}
															min={1}
														/>
													</Form.Group>
													<br />
													<Button
														style={{ height: "fit-content" }}
														onClick={() => {
															deleteItem(index);
															cancelIntent();
														}}
													>
														X
													</Button>
												</div>
											</td>
											<td className="align-middle">
												{Big(
													pricelist[item["supertype"]][item["product"]][
														item["type"]
													]
												)
													.multiply(Big(item["amount"].toString()))
													.toString()}
											</td>
										</tr>
									))}
									<tr>
										<td>Zwischen-summe:</td>
										<td></td>
										<td className="align-middle"></td>
										<td className="align-middle">{subtotal.toString()}</td>
									</tr>
								</tbody>
							</Table>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header onClick={() => toggleActivity("1")}>
							Versand
						</Accordion.Header>
						<Accordion.Body>
							<Form>
								<div key="inline-radio" className="mb-3">
									<Form.Check
										label="Abholen (Kostenlos)"
										name="group1"
										type="radio"
										id="inline-radio-1"
										checked={order["deliveryType"] === "Abholen"}
										onChange={({ target }) => {
											if (target.value === "on") {
												changeDeliveryType("Abholen");
											}
											cancelIntent();
										}}
									/>
									<Form.Check
										label="Hermes-Versand (4.99)"
										name="group1"
										type="radio"
										id="inline-radio-2"
										checked={order["deliveryType"] === "Hermes-Versand"}
										onChange={({ target }) => {
											if (target.value === "on") {
												changeDeliveryType("Hermes-Versand");
											}
											cancelIntent();
										}}
									/>
								</div>
							</Form>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header onClick={() => toggleActivity("2")}>
							Ihre Kontaktdaten
						</Accordion.Header>
						<Accordion.Body>
							<Form.Group className="d-flex justify-content-between align-items-center">
								<Form.Label style={{ padding: 0, margin: 0 }}>
									Vorname:
								</Form.Label>
								<Form.Control
									value={order["deliveryAddress"]["firstName"]}
									onChange={({ target }) => {
										changeDeliveryAddress("firstName", target.value);
									}}
									style={{ width: "70%" }}
									type="text"
								/>
							</Form.Group>
							<Form.Group className="d-flex justify-content-between align-items-center mt-3">
								<Form.Label style={{ padding: 0, margin: 0 }}>
									Nachname:
								</Form.Label>
								<Form.Control
									value={order["deliveryAddress"]["surname"]}
									onChange={({ target }) => {
										changeDeliveryAddress("surname", target.value);
									}}
									style={{ width: "70%" }}
									type="text"
								/>
							</Form.Group>
							<Form.Group className="d-flex justify-content-between align-items-center mt-3">
								<Form.Label style={{ padding: 0, margin: 0 }}>
									Mobil:
								</Form.Label>
								<Form.Control
									onChange={({ target }) => {
										changeDeliveryAddress("mobile", target.value);
									}}
									style={{ width: "70%" }}
									value={order["deliveryAddress"]["mobile"]}
								/>
							</Form.Group>
							<Form.Group className="d-flex justify-content-between align-items-center mt-3">
								<Form.Label style={{ padding: 0, margin: 0 }}>
									Email-Addresse:
								</Form.Label>
								<Form.Control
									onChange={({ target }) => {
										changeDeliveryAddress("email", target.value);
									}}
									style={{ width: "70%" }}
									type="email"
									value={order["deliveryAddress"]["email"]}
								/>
							</Form.Group>
							{order["deliveryType"] === "Abholen" ? (
								<></>
							) : (
								<>
									<Form.Group className="d-flex justify-content-between align-items-center mt-3">
										<Form.Label style={{ padding: 0, margin: 0 }}>
											Straße:
										</Form.Label>
										<Form.Control
											onChange={({ target }) => {
												changeDeliveryAddress("street", target.value);
											}}
											style={{ width: "70%" }}
											value={order["deliveryAddress"]["street"]}
										/>
									</Form.Group>
									<Form.Group className="d-flex justify-content-between align-items-center mt-3">
										<Form.Label style={{ padding: 0, margin: 0 }}>
											Hausnummer:
										</Form.Label>
										<Form.Control
											onChange={({ target }) => {
												changeDeliveryAddress("houseNumber", target.value);
											}}
											style={{ width: "70%" }}
											value={order["deliveryAddress"]["houseNumber"]}
										/>
									</Form.Group>
									<Form.Group className="d-flex justify-content-between align-items-center mt-3">
										<Form.Label style={{ padding: 0, margin: 0 }}>
											Postzahl:
										</Form.Label>
										<Form.Control
											onChange={({ target }) => {
												changeDeliveryAddress("ZIPCode", target.value);
											}}
											style={{ width: "70%" }}
											value={order["deliveryAddress"]["ZIPCode"]}
										/>
									</Form.Group>
									<Form.Group className="d-flex justify-content-between align-items-center mt-3">
										<Form.Label style={{ padding: 0, margin: 0 }}>
											Stadt:
										</Form.Label>
										<Form.Control
											onChange={({ target }) => {
												changeDeliveryAddress("city", target.value);
											}}
											style={{ width: "70%" }}
											value={order["deliveryAddress"]["city"]}
										/>
									</Form.Group>
								</>
							)}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="3">
						<Accordion.Header
							onClick={() => {
								if (showFormGaps()) {
									setErrorMessage(showFormGaps());
								} else {
									toggleActivity("3");
									fetchClientSecret(order);
									changeOrderNumber(Date.now().toString());
								}
							}}
						>
							Zahlungsarten
						</Accordion.Header>
						<Accordion.Body>
							{clientSecret ? (
								<>
									<PaymentElement />
								</>
							) : (
								<></>
							)}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Modal.Body>
			<Form.Check
				type="checkbox"
				ref={AGBCheckboxRef}
				className="m-4"
				checked={AGBAgreement}
				onChange={() => setAGBAgreement(AGBCheckboxRef.current.checked)}
				label={
					<>
						Ich stimme den{" "}
						<b
							style={{ cursor: "pointer" }}
							onClick={() => handleRedirect("AGBDialogReversible")}
						>
							AGB
						</b>{" "}
						zu.
					</>
				}
			/>
			{Number(subtotal.toString()) !== 0 ? (
				<div className="d-flex justify-content-start align-items-center m-4">
					<h4 style={{ padding: 0, margin: 0 }}>Gesammtsumme: </h4>
					<h4
						className="ms-2"
						style={{
							padding: 0,
							margin: 0,
							width: "68%",
						}}
					>
						€
						{subtotal
							.add(Big(pricelist["delivery"][order["deliveryType"]]))
							.toString()}
					</h4>
				</div>
			) : (
				<></>
			)}

			{errorMessage}
			<Modal.Footer>
				<Button variant="secondary" onClick={() => handleClose()}>
					Weiter einkaufen
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						if (showFormGaps()) {
							setErrorMessage(showFormGaps());
						} else if (!clientSecret) {
							setErrorMessage(
								<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
									<p style={{ padding: 0, margin: 0 }}>
										Bitte wählen Sie Ihre bevorzugte Zahlungsmethode.
									</p>
								</Modal.Body>
							);
						} else if (!AGBCheckboxRef.current.checked) {
							setErrorMessage(
								<Modal.Body style={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }}>
									<p style={{ padding: 0, margin: 0 }}>
										Sie müssen den AGB zustimmen.
									</p>
								</Modal.Body>
							);
						} else {
							setErrorMessage(<></>);
							changeOrderNumber(
								order["orderNumber"] + "-" + Date.now().toString()
							);
							submitPayment();
						}
					}}
				>
					Bestellen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default CartAndCheckoutDialog;
