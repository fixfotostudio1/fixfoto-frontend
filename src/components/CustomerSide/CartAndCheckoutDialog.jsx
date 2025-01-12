import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

const CartAndCheckoutDialog = ({
	handleClose,
	order,
	pricelist,
	changeAmount,
	changeDeliveryAddress,
	changeDeliveryType,
	submitPayment,
}) => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Bearbeiten & bestellen</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Warenkorb</Accordion.Header>
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
						<Accordion.Header>Versand</Accordion.Header>
						<Accordion.Body>
							<Form>
								<div key="inline-radio" className="mb-3">
									<Form.Check
										label="Abholen"
										name="group1"
										type="radio"
										id="inline-radio-1"
										checked={order["deliveryType"] === "Abholen"}
										onChange={({ target }) => {
											if (target.value === "on")
												changeOrder({ ...order, deliveryType: "Abholen" });
										}}
									/>
									<Form.Check
										label="Hermes-Versand"
										name="group1"
										type="radio"
										id="inline-radio-2"
										checked={order["deliveryType"] === "Hermes-Versand"}
										onChange={({ target }) => {
											if (target.value === "on")
												changeOrder({
													...order,
													deliveryType: "Hermes-Versand",
												});
										}}
									/>
								</div>
							</Form>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Ihre Kontaktdaten</Accordion.Header>
						<Accordion.Body></Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="3">
						<Accordion.Header>Zahlungsarten</Accordion.Header>
						<Accordion.Body></Accordion.Body>
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
