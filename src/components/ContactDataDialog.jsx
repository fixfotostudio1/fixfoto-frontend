import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ContactDataDialog = ({ handleClose, handleRedirect }) => {
	return (
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
				<Button
					variant="primary"
					onClick={() => handleRedirect("PaymentDialog")}
				>
					Bezahlen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ContactDataDialog;
