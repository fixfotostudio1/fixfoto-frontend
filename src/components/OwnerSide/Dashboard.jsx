import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";

import PriceCard from "./PriceCard";
import OrdersTable from "./OrdersTable";

const Dashboard = ({
	handleClick,
	handleDelete,
	modifiedPricelist,
	orders,
	token,
	setModifiedPricelist,
}) => {
	const computeTabTitle = (tabName) => {
		return `${tabName.slice(0, 1).toUpperCase() + tabName.slice(1)} (${
			orders.filter((order) => order["status"] === tabName).length
		})`;
	};
	return (
		<Tabs defaultActiveKey="neu" id="uncontrolled-tab-example" className="mb-3">
			{...[
				"unbezahlt",
				"neu",
				"abholbereit",
				"versandbereit",
				"abgeschlossen",
			].map((status) => (
				<Tab eventKey={status} title={computeTabTitle(status)}>
					<OrdersTable
						currStatus={status}
						handleClick={handleClick}
						handleDelete={handleDelete}
						orders={orders}
					/>
				</Tab>
			))}
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
