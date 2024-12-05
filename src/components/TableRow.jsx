import Button from "react-bootstrap/Button";

const TableRow = ({ item, handleClick }) => {
	console.log(item["deliveryType"]);
	let buttonText = "";
	if (item["status"] === "abholbereit" || item["status"] === "versandbereit") {
		buttonText = "abgeschlossen";
	} else if (item["status"] === "neu" && item["deliveryType"] === "Abholen") {
		buttonText = "abholbereit";
	} else if (
		item["status"] === "neu" &&
		item["deliveryType"] === "Hermes-Versand"
	) {
		buttonText = "versandbereit";
	} else if (item["status"] === "abgeschlossen") {
		buttonText = "löschen";
	}
	return (
		<tr>
			<td>{item["orderNumber"]}</td>
			<td>
				<ul>
					{...item["items"].map((i) => (
						<li style={{ marginBottom: "40px" }}>
							{i["articleType"]}
							<br />
							{i["articleSubtype"]}
							<br />
							Anzahl: {i["copies"]}
							<br />
							<a href={i["imgUrl"]} style={{ color: "blue" }}>
								Bild herunterladen
							</a>
						</li>
					))}
				</ul>
			</td>
			<td>{item["deliveryType"]}</td>
			<td>
				{item["deliveryAddress"]["firstName"] +
					" " +
					item["deliveryAddress"]["surname"]}
				<br />
				{item["deliveryAddress"]["mobile"]}
				<br />
				{item["deliveryAddress"]["email"]}
				<br />
				{item["deliveryAddress"]["street"] +
					" " +
					item["deliveryAddress"]["houseNumber"]}
				<br />
				{item["deliveryAddress"]["ZIPcode"] +
					" " +
					item["deliveryAddress"]["city"]}
				<br />
				{item["deliveryAddress"]["country"]}
			</td>
			<td>
				<Button onClick={handleClick}>{buttonText}</Button>
			</td>
		</tr>
	);
};

export default TableRow;
