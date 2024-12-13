import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const OverviewDialog = ({ handleRedirect, order, getClientSecret }) => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Übersicht</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
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
							{...order["items"].map((item, index) => (
								<tr>
									<td>{item["product"]}</td>
									<td>{item["type"]}</td>
									<td>{item["file"].name}</td>
									<td>{item["amount"]}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button onClick={() => handleRedirect("ShoppingCartDialog")}>
						Warenkorb ändern
					</Button>
				</div>
				<div>
					<p>Versandart: </p>
					<br />
					<p>{order["deliveryAddress"]["deliveryType"]}</p>
					<Button onClick={() => handleRedirect("DeliveryTypeDialog")}>
						Versandart ändern
					</Button>
				</div>
				<div>
					<p>Lieferadresse: </p>
					<br />
					<p>{`${order["deliveryAddress"]["firstName"]} ${order["deliveryAddress"]["surname"]}`}</p>
					<p>{order["deliveryAddress"]["mobile"]}</p>
					<p>{order["deliveryAddress"]["email"]}</p>
					<p>{`${order["deliveryAddress"]["street"]} ${order["deliveryAddress"]["houseNumber"]}`}</p>
					<p>{`${order["deliveryAddress"]["ZIPCode"]} ${order["deliveryAddress"]["city"]}`}</p>
					<p>Deutschland</p>
					<Button onClick={() => handleRedirect("DeliveryAddressDialog")}>
						Lieferadresse ändern
					</Button>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						handleRedirect("PaymentDialog");
					}}
				>
					Bezahlen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default OverviewDialog;
