import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DeliveryAddressDialog = ({
	handleRedirect,
	updateDeliveryAddress,
	order,
}) => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Ihre Daten</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="d-flex justify-content-between align-items-center">
					<Form.Label style={{ padding: 0, margin: 0 }}>Vorname:</Form.Label>
					<Form.Control
						value={order["deliveryAddress"]["firstName"]}
						onChange={({ target }) => {
							updateDeliveryAddress("firstName", target.value);
						}}
						style={{ width: "70%" }}
						type="text"
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Nachname:</Form.Label>
					<Form.Control
						value={order["deliveryAddress"]["surname"]}
						onChange={({ target }) => {
							updateDeliveryAddress("surname", target.value);
						}}
						style={{ width: "70%" }}
						type="text"
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Mobil:</Form.Label>
					<Form.Control
						onChange={({ target }) => {
							updateDeliveryAddress("mobile", target.value);
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
							updateDeliveryAddress("email", target.value);
						}}
						style={{ width: "70%" }}
						type="email"
						value={order["deliveryAddress"]["email"]}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Straße:</Form.Label>
					<Form.Control
						onChange={({ target }) => {
							updateDeliveryAddress("street", target.value);
						}}
						style={{ width: "70%" }}
						value={order["deliveryAddress"]["street"]}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Hausnummer:</Form.Label>
					<Form.Control
						onChange={({ target }) => {
							updateDeliveryAddress("houseNumber", target.value);
						}}
						style={{ width: "70%" }}
						value={order["deliveryAddress"]["houseNumber"]}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Postzahl:</Form.Label>
					<Form.Control
						onChange={({ target }) => {
							updateDeliveryAddress("ZIPCode", target.value);
						}}
						style={{ width: "70%" }}
						value={order["deliveryAddress"]["ZIPCode"]}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>Stadt:</Form.Label>
					<Form.Control
						onChange={({ target }) => {
							updateDeliveryAddress("city", target.value);
						}}
						style={{ width: "70%" }}
						value={order["deliveryAddress"]["city"]}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary">Zurück zur Versandart</Button>
				<Button
					variant="primary"
					onClick={() => handleRedirect("OverviewDialog")}
				>
					Übersicht
				</Button>
			</Modal.Footer>
		</>
	);
};

export default DeliveryAddressDialog;
