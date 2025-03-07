import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import TableRow from "./TableRow";
import PriceCard from "./PriceCard";

const Dashboard = ({
	handleClick,
	handleDelete,
	modifiedPricelist,
	orders,
	token,
	setModifiedPricelist,
}) => {
	return (
		<Tabs defaultActiveKey="neu" id="uncontrolled-tab-example" className="mb-3">
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
									handleClick={(newStatus) => handleClick(order, newStatus)}
									handleDelete={() => handleDelete(order)}
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
									handleClick={(newStatus) => handleClick(order, newStatus)}
									handleDelete={() => handleDelete(order)}
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
									handleClick={(newStatus) => handleClick(order, newStatus)}
									handleDelete={() => handleDelete(order)}
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
									handleClick={(newStatus) => handleClick(order, newStatus)}
									handleDelete={() => handleDelete(order)}
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
								onClick={() => handlePricelistChange(modifiedPricelist, token)}
							>
								Speichern
							</Button>
						</Card.Footer>
					</Card>
				</div>
			</Tab>
		</Tabs>
	);
};

export default Dashboard;
