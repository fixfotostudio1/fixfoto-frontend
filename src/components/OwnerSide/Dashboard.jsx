import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";

import PriceCard from "./PriceCard";
import OrdersTable from "./OrdersTable";

import { DashboardContext } from "./OwnerSide";

const Dashboard = ({ token }) => {
	const ctx = useContext(DashboardContext);
	const computeTabTitle = (tabName) => {
		return `${tabName.slice(0, 1).toUpperCase() + tabName.slice(1)} (${
			ctx.orders.filter((order) => order["status"] === tabName).length
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
					<OrdersTable currStatus={status} />
				</Tab>
			))}
			<Tab eventKey="preisliste" title="Preisliste-Einstellungen">
				<div className="vw-100 d-flex flex-column justify-content-center align-items-center">
					<Card className="text-center">
						<Card.Header>Preisliste</Card.Header>
						<>
							{...[
								"passfotos",
								"bewerbungsbilder",
								"portraits",
								"fotoprodukte",
								"rahmen",
								"labor",
								"videokassetten",
								"kopien",
								"delivery",
							].map((supertype) => <PriceCard productSupertype={supertype} />)}
						</>

						<Card.Footer>
							<Button
								onClick={() =>
									ctx.handlePricelistChange(ctx.modifiedPricelist, token)
								}
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
