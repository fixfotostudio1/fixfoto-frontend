import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const ShoppingCartDialog = ({
	handleClose,
	order,
	handleRedirect,
	deleteItem,
}) => {
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
							<th>Entfernen</th>
						</tr>
					</thead>
					<tbody>
						{...order["items"].map((item, index) => (
							<tr>
								<td>{item["product"]}</td>
								<td>{item["type"]}</td>
								<td>{item["file"].name}</td>
								<td>{item["amount"]}</td>
								<td>
									<Button onClick={() => deleteItem(index)}>Löschen</Button>
								</td>
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
