import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { DashboardContext } from "./OwnerSide";

const TableRow = ({ order, statusesArray }) => {
	const ctx = useContext(DashboardContext);
	const orderNumber = order["orderNumber"];
	const itemsDetails = (
		<ul>
			{...order["items"].map((i) => (
				<li style={{ marginBottom: "40px" }}>
					{i["product"]}
					<br />
					{"ID: " + i["S3TempName"]}
					<br />
					{i["type"]}
					<br />
					Anzahl: {i["amount"]}
					<br />
					<Button
						onClick={() =>
							ctx.AWSObj2ImageURL(order["orderNumber"], i["S3TempName"])
						}
						style={{ color: "blue", backgroundColor: "white" }}
					>
						Bild herunterladen
					</Button>
				</li>
			))}
		</ul>
	);
	const deliveryType = order["deliveryType"];
	const customerData = (
		<>
			{order["deliveryAddress"]["firstName"] +
				" " +
				order["deliveryAddress"]["surname"]}
			<br />
			{order["deliveryAddress"]["mobile"]}
			<br />
			{order["deliveryAddress"]["email"]}
			{order["deliveryType"] !== "Abholen" ? (
				<>
					<br />
					{order["deliveryAddress"]["street"] +
						" " +
						order["deliveryAddress"]["houseNumber"]}
					<br />
					{order["deliveryAddress"]["ZIPCode"] +
						" " +
						order["deliveryAddress"]["city"]}
					<br />
					{order["deliveryAddress"]["country"]}{" "}
				</>
			) : (
				<></>
			)}
		</>
	);
	const mainButton = (
		<Button
			onClick={() => {
				if (statusesArray[0] === "löschen") {
					ctx.handleDelete(order);
				} else {
					ctx.handleClick(order, statusesArray[0]);
				}
			}}
			style={{ width: "70%", minWidth: "fit-content" }}
		>
			{statusesArray[0]}
		</Button>
	);
	const dropdownButtons = (
		<>
			{...statusesArray.slice(1).map((newStatus) => {
				if (newStatus === "löschen") {
					return (
						<Dropdown.Item onClick={() => ctx.handleDelete(order)}>
							{newStatus}
						</Dropdown.Item>
					);
				}
				return (
					<Dropdown.Item onClick={() => ctx.handleClick(order, newStatus)}>
						{newStatus}
					</Dropdown.Item>
				);
			})}
		</>
	);
	return (
		<tr>
			<td>{orderNumber}</td>
			<td>{itemsDetails}</td>
			<td>{deliveryType}</td>
			<td>{customerData}</td>
			<td>
				<Dropdown>
					{mainButton}
					<Dropdown.Toggle
						variant="success"
						id="dropdown-basic"
						style={{ width: "30%", minWidth: "fit-content" }}
					></Dropdown.Toggle>

					<Dropdown.Menu>{dropdownButtons}</Dropdown.Menu>
				</Dropdown>
			</td>
		</tr>
	);
};

export default TableRow;
