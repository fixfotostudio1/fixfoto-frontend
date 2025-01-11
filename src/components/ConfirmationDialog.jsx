import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationDialog = () => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Success</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
			<Modal.Footer></Modal.Footer>
		</>
	);
};

export default ConfirmationDialog;
