import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const ShoppingCartDialog = ({ handleClose, order, handleRedirect }) => {
	console.log("shoppingCartContent: ", order);
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Warenkorb</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Artikel</th>
							<th>Typ</th>
							<th>Dateiname</th>
							<th>Anzahl</th>
						</tr>
					</thead>
					<tbody>
						{...order["items"].map((item) => (
							<tr>
								<td>{item["product"]}</td>
								<td>{item["type"]}</td>
								<td>{item["filename"]}</td>
								<td>{item["amount"]}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Zurück
				</Button>
				<Button
					variant="primary"
					onClick={() => handleRedirect("DeliveryTypeDialog")}
				>
					Versandart wählen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ShoppingCartDialog;
