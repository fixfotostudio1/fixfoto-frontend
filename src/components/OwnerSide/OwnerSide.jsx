import { useState, useRef } from "react";
import axios from "axios";

import {
	S3Client,
	S3ServiceException,
	DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3_BUCKET, REGION, AWS_IDENTITY_POOL_ID } from "../../utils/config";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import TableRow from "./TableRow";
import PriceCard from "./PriceCard";
import DeleteDialog from "./DeleteDialog";

const OwnerSide = ({ pricelist, handlePricelistChange }) => {
	const client = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: REGION },
			identityPoolId: AWS_IDENTITY_POOL_ID,
		}),
	});

	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [orderInfo, setOrderInfo] = useState([]);

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [orderToBeDeleted, setOrderToBeDeleted] = useState(null);

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

	const changeStatus = (order, token, newStatus) => {
		console.log("OwnerSide changeStatus newStatus: ", newStatus);
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

	const deleteOrderFilesFromBucket = async (order) => {
		const keys = order["items"].map(
			(item) => order["orderNumber"] + "-" + item.S3TempName
		);
		console.log("deleteImages");
		try {
			const response = await client.send(
				new DeleteObjectsCommand({
					Bucket: S3_BUCKET,
					Delete: {
						Objects: keys.map((k) => ({ Key: k })),
					},
				})
			);
			console.log("deleted images: ", response);
		} catch (caught) {
			if (
				caught instanceof S3ServiceException &&
				caught.name === "NoSuchBucket"
			) {
				console.error(
					`Error from S3 while deleting objects from ${S3_BUCKET}. The bucket doesn't exist.`
				);
			} else if (caught instanceof S3ServiceException) {
				console.error(
					`Error from S3 while deleting objects from ${S3_BUCKET}.  ${caught.name}: ${caught.message}`
				);
			} else {
				throw caught;
			}
		}
	};

	const deleteOrderFromDb = (order, token) => {
		axios
			.delete(`http://localhost:3001/api/orders/${order["id"]}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => updateInfo(token));
	};

	const loginForm = () => (
		<Modal
			show={true}
			animation={true}
			centered
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					handleLogin(username, password);
				}
			}}
		>
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
		<>
			<Tabs
				defaultActiveKey="neu"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab
					eventKey="neu"
					title={`Neu (${
						orderInfo.filter((order) => order["status"] === "neu").length
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
						<tbody>
							{...orderInfo
								.filter((order) => order["status"] === "neu")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, user, newStatus);
										}}
										handleDelete={() => {
											setOrderToBeDeleted(order);
											setShowDeleteDialog(true);
										}}
										statusesArray={
											order["deliveryType"] === "Abholen"
												? ["abholbereit", "abgeschlossen", "löschen"]
												: ["versandbereit", "abgeschlossen", "löschen"]
										}
									/>
								))}
						</tbody>
					</Table>
				</Tab>
				<Tab
					eventKey="abholbereit"
					title={`Abholbereit (${
						orderInfo.filter((order) => order["status"] === "abholbereit")
							.length
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
						<tbody>
							{...orderInfo
								.filter((order) => order["status"] === "abholbereit")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, user, newStatus);
										}}
										handleDelete={() => {
											setOrderToBeDeleted(order);
											setShowDeleteDialog(true);
										}}
										statusesArray={["abgeschlossen", "neu", "löschen"]}
									/>
								))}
						</tbody>
					</Table>
				</Tab>
				<Tab
					eventKey="versandbereit"
					title={`Versandbereit (${
						orderInfo.filter((order) => order["status"] === "versandbereit")
							.length
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
						<tbody>
							{...orderInfo
								.filter((order) => order["status"] === "versandbereit")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, user, newStatus);
										}}
										handleDelete={() => {
											setOrderToBeDeleted(order);
											setShowDeleteDialog(true);
										}}
										statusesArray={["abgeschlossen", "neu", "löschen"]}
									/>
								))}
						</tbody>
					</Table>
				</Tab>
				<Tab
					eventKey="abgeschlossen"
					title={`Abgeschlossen (${
						orderInfo.filter((order) => order["status"] === "abgeschlossen")
							.length
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
						<tbody>
							{...orderInfo
								.filter((order) => order["status"] === "abgeschlossen")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, user, newStatus);
										}}
										handleDelete={() => {
											setOrderToBeDeleted(order);
											setShowDeleteDialog(true);
										}}
										statusesArray={
											order["deliveryType"] === "Abholen"
												? ["löschen", "abholbereit", "neu"]
												: ["löschen", "versandbereit", "neu"]
										}
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
										value={
											newPricelist["passfotos"]["4 biometrische Passbilder"]
										}
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
								<Button
									onClick={() => handlePricelistChange(newPricelist, user)}
								>
									Speichern
								</Button>
							</Card.Footer>
						</Card>
					</div>
				</Tab>
			</Tabs>
			<DeleteDialog
				showDeleteDialog={showDeleteDialog}
				handleClose={() => setShowDeleteDialog(false)}
				orderToBeDeleted={orderToBeDeleted}
				handleDelete={() => {
					deleteOrderFilesFromBucket(orderToBeDeleted);
					deleteOrderFromDb(orderToBeDeleted, user);
					setShowDeleteDialog(false);
				}}
			/>
		</>
	);

	return <>{!user ? loginForm() : dashboard()}</>;
};

export default OwnerSide;
