const OTPlaceholder = ({ currstatus, orders }) => {
	console.log("OTPlaceholder currstatus: ", currstatus);
	const determineStatusesArray = (order) => {
		if (currstatus === "neu") {
			if (order["deliveryType"] === "Abholen") {
				return ["abholbereit", "abgeschlossen", "löschen"];
			} else {
				return ["versandbereit", "abgeschlossen", "löschen"];
			}
		} else if (currstatus === "abholbereit") {
			return ["abgeschlossen", "neu", "löschen"];
		} else if (currstatus === "versandbereit") {
			return ["abgeschlossen", "neu", "löschen"];
		} else if (currstatus === "abgeschlossen") {
			if (order["deliveryType"] === "Abholen") {
				return ["löschen", "neu", "abholbereit"];
			} else {
				return ["löschen", "neu", "versandbereit"];
			}
		}
	};
	return (
		<Tab
			eventKey={currstatus}
			title={`${currstatus} (${
				orders.filter((order) => order["status"] === currstatus).length
			})`}
		>
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
			</Table>
		</Tab>
	);
};

export default OTPlaceholder;
