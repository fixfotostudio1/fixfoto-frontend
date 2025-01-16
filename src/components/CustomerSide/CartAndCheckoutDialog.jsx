import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useState, useRef } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const CartAndCheckoutDialog = ({
	handleClose,
	order,
	pricelist,
	changeAmount,
	changeDeliveryAddress,
	changeDeliveryType,
	clientSecret,
	fetchClientSecret,
	alwaysActiveList,
	toggleActivity,
}) => {
	let stripe = null;
	if (clientSecret) {
		stripe = useStripe();
	}

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
															style={{ maxWidth: "80%" }}
															onChange={({ target }) =>
																changeAmount(index, target.value)
															}
															min={1}
														/>
													</Form.Group>
													<br />
													<Button
														style={{ height: "fit-content" }}
														onClick={() => changeAmount(index, 0)}
													>
														X
													</Button>
												</div>
											</td>
											<td className="align-middle">
												{Math.round(
													pricelist[item["supertype"]][item["product"]][
														item["type"]
													] *
														item["amount"] *
														100
												) / 100}
											</td>
										</tr>
									))}
									<tr>
										<td>Zwischen-summe:</td>
										<td></td>
										<td className="align-middle"></td>
										<td className="align-middle">
											{Math.round(
												order["items"].reduce(
													(acc, item) =>
														acc +
														pricelist[item["supertype"]][item["product"]][
															item["type"]
														] *
															item["amount"],
													0
												) * 100
											) / 100}
										</td>
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
											if (target.value === "on") changeDeliveryType("Abholen");
										}}
									/>
									<Form.Check
										label="Hermes-Versand (4.99)"
										name="group1"
										type="radio"
										id="inline-radio-2"
										checked={order["deliveryType"] === "Hermes-Versand"}
										onChange={({ target }) => {
											if (target.value === "on")
												changeDeliveryType("Hermes-Versand");
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
								toggleActivity("3");
								fetchClientSecret();
							}}
						>
							Zahlungsarten
						</Accordion.Header>
						<Accordion.Body>
							{clientSecret ? (
								<>
									<PaymentElement />
									<Button disabled={!stripe} onClick={() => {}}>
										Submit
									</Button>
									{/* Show error message to your customers */}
									{/* errorMessage && <div>{errorMessage}</div> */}
								</>
							) : (
								<></>
							)}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => handleClose()}>
					Weiter einkaufen
				</Button>
				<Button variant="primary" onClick={() => {}}>
					Bestellen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default CartAndCheckoutDialog;
