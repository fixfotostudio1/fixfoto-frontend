import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PostPaymentInfoDialog = ({ handleClose, order, orderSuccess }) => {
	if (orderSuccess === "failed") {
		return (
			<>
				<Modal.Header closeButton>
					<Modal.Title>{"Zahlung gescheitert."}</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => handleClose()}>
						OK
					</Button>
				</Modal.Footer>
			</>
		);
	} else if (orderSuccess === "succeeded") {
		return (
			<>
				<Modal.Header closeButton>
					<Modal.Title>{"Bestellung erhalten. Danke!"}</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => handleClose()}>
						OK
					</Button>
				</Modal.Footer>
			</>
		);
	} else {
		return (
			<>
				<Modal.Header closeButton>
					<Modal.Title>{"Nur noch etwas..."}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Wir haben deine Bestellung erhalten und kümmern uns darum sobald wir
					deine Zahlung erhalten.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => handleClose()}>
						OK
					</Button>
				</Modal.Footer>
			</>
		);
	}
};

export default PostPaymentInfoDialog;
