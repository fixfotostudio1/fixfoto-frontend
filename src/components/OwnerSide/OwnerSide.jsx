import { useState } from "react";
import axios from "axios";

import {
	S3Client,
	S3ServiceException,
	DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3_BUCKET, REGION, AWS_IDENTITY_POOL_ID } from "../../utils/config";

import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import TableRow from "./TableRow";
import PriceCard from "./PriceCard";
import DeleteDialog from "./DeleteDialog";
import LoginForm from "./LoginForm";

const OwnerSide = ({ pricelist, handlePricelistChange }) => {
	const client = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: REGION },
			identityPoolId: AWS_IDENTITY_POOL_ID,
		}),
	});

	const [modifiedPricelist, setModifiedPricelist] = useState(pricelist);
	const [orders, setOrders] = useState([]);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState(null);

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [orderToBeDeleted, setOrderToBeDeleted] = useState(null);

	const handleLogin = (un, pw) => {
		axios
			.post("http://localhost:3001/api/login", { username: un, password: pw })
			.then((response) => {
				setToken(response["data"]["token"]);
				updateOrders(response["data"]["token"]);
			})
			.catch((error) => {
				console.log("error: ", error);
			});
	};

	const updateOrders = (token) => {
		axios
			.get("http://localhost:3001/api/orders", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((result) => {
				setOrders(result["data"]);
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
				updateOrders(token);
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
			.then(() => updateOrders(token));
	};

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
						orders.filter((order) => order["status"] === "neu").length
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
							{...orders
								.filter((order) => order["status"] === "neu")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, token, newStatus);
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
						orders.filter((order) => order["status"] === "abholbereit").length
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
							{...orders
								.filter((order) => order["status"] === "abholbereit")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, token, newStatus);
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
						orders.filter((order) => order["status"] === "versandbereit").length
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
							{...orders
								.filter((order) => order["status"] === "versandbereit")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, token, newStatus);
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
						orders.filter((order) => order["status"] === "abgeschlossen").length
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
							{...orders
								.filter((order) => order["status"] === "abgeschlossen")
								.map((order) => (
									<TableRow
										item={order}
										handleClick={(newStatus) => {
											console.log("nS: ", newStatus);
											changeStatus(order, token, newStatus);
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
							<PriceCard
								productType={"passfotos"}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"bewerbungsbilder"}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"portraits"}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"fotoprodukte"}
								productSubtypesAvailable={true}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"rahmen"}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"labor"}
								productSubtypesAvailable={true}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"videokassetten"}
								productSubtypesAvailable={true}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"kopien"}
								productSubtypesAvailable={true}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<PriceCard
								productType={"delivery"}
								modifiedPricelist={modifiedPricelist}
								setModifiedPricelist={setModifiedPricelist}
							/>
							<Card.Footer>
								<Button
									onClick={() =>
										handlePricelistChange(modifiedPricelist, token)
									}
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
					deleteOrderFromDb(orderToBeDeleted, token);
					setShowDeleteDialog(false);
				}}
			/>
		</>
	);

	return (
		<>
			{!token ? (
				<LoginForm
					handleLogin={() => handleLogin(username, password)}
					setPassword={setPassword}
					setUsername={setUsername}
				/>
			) : (
				dashboard()
			)}
		</>
	);
};

export default OwnerSide;
