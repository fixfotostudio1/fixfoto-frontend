import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PostPaymentInfoDialog = ({ handleClose, order, orderSuccess }) => {
	if (orderSuccess === "failed") {
		return (
			<>
				<Modal.Header closeButton>
					<Modal.Title>{"Zahlung gescheitert."}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Leider wurde Ihre Zahlung von Ihrer Bank abegelehnt.
					<br />
					Kontaktieren Sie Ihre Bank oder probieren Sie es mit einer anderen
					Zahlungsmethode.
					<br />
					<br />
					Ihr Warenkorb wartet 7 Tage weiterhin auf Sie!
				</Modal.Body>
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
				<Modal.Body>
					Ihre Bestellung (Nr. {order["orderNumber"]}) wird gleich bearbeitet.
					Sie bekommen in Kürze eine Bestätigung per E-Mail und werden auch noch
					benachrichtigt, sobald Ihre Bestellung abholbereit ist. <br />
					<br />
					Falls Sie noch Fragen haben, können Sie uns unter ... oder ...
					erreichen.
				</Modal.Body>
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
