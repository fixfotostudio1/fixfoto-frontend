import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";

const OrdersTable = ({ currStatus, handleClick, handleDelete, orders }) => {
	const determineStatusesArray = (order) => {
		if (currStatus === "neu") {
			if (order["deliveryType"] === "Abholen") {
				return ["abholbereit", "abgeschlossen", "löschen"];
			} else {
				return ["versandbereit", "abgeschlossen", "löschen"];
			}
		} else if (currStatus === "abholbereit") {
			return ["abgeschlossen", "neu", "löschen"];
		} else if (currStatus === "versandbereit") {
			return ["abgeschlossen", "neu", "löschen"];
		} else if (currStatus === "abgeschlossen") {
			if (order["deliveryType"] === "Abholen") {
				return ["löschen", "neu", "abholbereit"];
			} else {
				return ["löschen", "neu", "versandbereit"];
			}
		}
	};
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Bestellnr.</th>
					<th>Artikel</th>
					<th>Versandart</th>
					<th>Kontaktdaten</th>
					<th>Status ändern</th>
				</tr>
			</thead>
			<tbody>
				{...orders
					.filter((order) => order["status"] === currStatus)
					.map((order) => (
						<TableRow
							item={order}
							handleClick={(newStatus) => handleClick(order, newStatus)}
							handleDelete={() => handleDelete(order)}
							statusesArray={determineStatusesArray(order)}
						/>
					))}
			</tbody>
		</Table>
	);
};

export default OrdersTable;
