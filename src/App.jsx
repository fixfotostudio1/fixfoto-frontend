import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

import "./App.css";
import CustomerSide from "./components/CustomerSide/CustomerSide";
import OwnerSide from "./components/OwnerSide/OwnerSide";

const App = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const orderSuccess = searchParams.get("redirect_status");
	const intentId = searchParams.get("payment_intent");

	const [pricelist, setPricelist] = useState(null);
	const handlePricelistChange = (newPricelist, token) => {
		axios
			.put(
				`http://localhost:3001/api/pricelist/${newPricelist["id"]}`,
				newPricelist,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((result) => {
				axios.get("http://localhost:3001/api/pricelist").then((result) => {
					setPricelist(result["data"][0]);
				});
			});
	};

	useEffect(() => {
		axios.get("http://localhost:3001/api/pricelist").then((result) => {
			setPricelist(result["data"][0]);
		});
	}, []);

	if (pricelist) {
		return (
			<Routes>
				<Route path="/" element={<CustomerSide pricelist={pricelist} />} />
				<Route
					path="/login"
					element={
						<OwnerSide
							pricelist={pricelist}
							handlePricelistChange={handlePricelistChange}
						/>
					}
				/>
				<Route
					path="/after_payment_attempt"
					element={
						<CustomerSide
							intentId={intentId}
							orderSuccess={orderSuccess}
							pricelist={pricelist}
						/>
					}
				/>
			</Routes>
		);
	} else return <></>;
};

export default App;
