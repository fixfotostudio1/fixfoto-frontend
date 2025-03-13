import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteDialog = ({
	deleteOrRefund,
	showDeleteDialog,
	handleClose,
	orderToBeDeleted,
	handleDelete,
}) => {
	if (orderToBeDeleted)
		return (
			<Modal
				show={showDeleteDialog}
				onHide={handleClose}
				animation={true}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Bestellung {deleteOrRefund === "delete" ? "löschen" : "erstatten"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Soll Bestellung {orderToBeDeleted["orderNumber"]} von{" "}
					{orderToBeDeleted["deliveryAddress"]["firstName"]}{" "}
					{orderToBeDeleted["deliveryAddress"]["surname"]}{" "}
					<b>
						permanent{" "}
						{deleteOrRefund === "delete"
							? "gelöscht"
							: "gelöscht und erstattet"}{" "}
					</b>{" "}
					werden?
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<Button onClick={handleDelete}>Ja</Button>
					<Button onClick={handleClose}>Nein</Button>
				</Modal.Footer>
			</Modal>
		);
};

export default DeleteDialog;
