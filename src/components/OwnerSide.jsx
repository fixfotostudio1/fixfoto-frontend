import { useState, useRef } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import TableRow from "./TableRow";
import PriceCard from "./PriceCard";

const OwnerSide = ({ pricelist, handlePricelistChange }) => {
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [orderInfo, setOrderInfo] = useState([]);

	const [newPricelist, setNewPricelist] = useState(pricelist);

	const handleLogin = (un, pw) => {
		axios
			.post("http://localhost:3001/api/login", { username: un, password: pw })
			.then((response) => {
				setUser(response["data"]["token"]);
				updateInfo(response["data"]["token"]);
			})
			.catch((error) => {
				console.log("error: ", error);
			});
	};

	const updateInfo = (token) => {
		axios
			.get("http://localhost:3001/api/orders", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((result) => {
				setOrderInfo(result["data"]);
			});
	};

	const changeStatus = (order, token) => {
		let newStatus = "";
		if (
			order["status"] === "abholbereit" ||
			order["status"] === "versandbereit"
		) {
			newStatus = "abgeschlossen";
		} else if (
			order["status"] === "neu" &&
			order["deliveryType"] === "Abholen"
		) {
			newStatus = "abholbereit";
		} else if (
			order["status"] === "neu" &&
			order["deliveryType"] === "Hermes-Versand"
		) {
			newStatus = "versandbereit";
		} else if (order["status"] === "abgeschlossen") {
			newStatus = "gelöscht";
		}
		axios
			.put(
				`http://localhost:3001/api/orders/${order["id"]}`,
				{ ...order, status: newStatus },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				updateInfo(token);
			});
	};

	const loginForm = () => (
		<Modal show={true} animation={true} centered>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>username:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>password:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						onChange={({ target }) => setPassword(target.value)}
						type="password"
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					onClick={() => handleLogin(username, password)}
				>
					Einloggen
				</Button>
			</Modal.Footer>
		</Modal>
	);

	const dashboard = () => (
		<Tabs defaultActiveKey="neu" id="uncontrolled-tab-example" className="mb-3">
			<Tab eventKey="neu" title="Neu">
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
						{...orderInfo
							.filter((order) => order["status"] === "neu")
							.map((order) => (
								<TableRow
									item={order}
									handleClick={() => changeStatus(order, user)}
								/>
							))}
					</tbody>
				</Table>
			</Tab>
			<Tab eventKey="abholbereit" title="Abholbereit">
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
						{...orderInfo
							.filter((order) => order["status"] === "abholbereit")
							.map((order) => (
								<TableRow
									item={order}
									handleClick={() => changeStatus(order, user)}
								/>
							))}
					</tbody>
				</Table>
			</Tab>
			<Tab eventKey="versandbereit" title="Versandbereit">
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
						{...orderInfo
							.filter((order) => order["status"] === "versandbereit")
							.map((order) => (
								<TableRow
									item={order}
									handleClick={() => changeStatus(order, user)}
								/>
							))}
					</tbody>
				</Table>
			</Tab>
			<Tab eventKey="abgeschlossen" title="Abgeschlossen">
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
						{...orderInfo
							.filter((order) => order["status"] === "abgeschlossen")
							.map((order) => (
								<TableRow
									item={order}
									handleClick={() => changeStatus(order, user)}
								/>
							))}
					</tbody>
				</Table>
			</Tab>
			<Tab eventKey="preisliste" title="Preisliste-Einstellungen">
				<div className="vw-100 d-flex flex-column justify-content-center align-items-center">
					<Card className="text-center">
						<Card.Header>Preisliste</Card.Header>
						<Card.Body>
							<Card.Title>Passfotos</Card.Title>
							<Form.Group className="d-flex justify-content-between align-items-center mt-3">
								<Form.Label style={{ padding: 0, margin: 0 }}>
									4 biometrische Passbilder:
								</Form.Label>
								<Form.Control
									style={{ width: "70%" }}
									value={newPricelist["passfotos"]["4 biometrische Passbilder"]}
									onChange={({ target }) => {
										const temp = {
											...newPricelist["passfotos"],
											"4 biometrische Passbilder": Number(target.value),
										};
										setNewPricelist({ ...newPricelist, passfotos: temp });
									}}
								/>
							</Form.Group>
						</Card.Body>
						<Card.Footer>
							<Button onClick={() => handlePricelistChange(newPricelist, user)}>
								Speichern
							</Button>
						</Card.Footer>
					</Card>
				</div>
			</Tab>
		</Tabs>
	);

	return <>{!user ? loginForm() : dashboard()}</>;
};

export default OwnerSide;
