import { useContext } from "react";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";

import { DashboardContext } from "./OwnerSide";

const OrdersTable = ({ currStatus }) => {
	const ctx = useContext(DashboardContext);
	const determineStatusesArray = (order) => {
		if (currStatus === "unbezahlt") {
			if (order["deliveryType"] === "Abholen") {
				return ["neu", "abholbereit", "abgeschlossen", "löschen"];
			} else {
				return ["neu", "versandbereit", "abgeschlossen", "löschen"];
			}
		} else if (currStatus === "neu") {
			if (order["deliveryType"] === "Abholen") {
				return ["abholbereit", "abgeschlossen", "löschen", "erstatten"];
			} else {
				return ["versandbereit", "abgeschlossen", "löschen", "erstatten"];
			}
		} else if (currStatus === "abholbereit") {
			return ["abgeschlossen", "neu", "löschen", "erstatten"];
		} else if (currStatus === "versandbereit") {
			return ["abgeschlossen", "neu", "löschen", "erstatten"];
		} else if (currStatus === "abgeschlossen") {
			if (order["deliveryType"] === "Abholen") {
				return ["löschen", "neu", "abholbereit", "erstatten"];
			} else {
				return ["löschen", "neu", "versandbereit", "erstatten"];
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
				{...ctx.orders
					.filter((order) => order["status"] === currStatus)
					.map((order) => (
						<TableRow
							order={order}
							statusesArray={determineStatusesArray(order)}
						/>
					))}
			</tbody>
		</Table>
	);
};

export default OrdersTable;
