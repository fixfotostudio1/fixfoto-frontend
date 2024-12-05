import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerSide from "./components/CustomerSide";
import OwnerSide from "./components/OwnerSide";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [pricelist, setPricelist] = useState(null);
	useEffect(() => {
		axios.get("http://localhost:3001/api/pricelist").then((result) => {
			setPricelist(result["data"][0]);
		});

		axios.post("http://localhost:3001/api/orders", {
			amount: 20.0,
			token: "000",
		});
	}, []);

	const handlePricelistChange = (newPricelist, token) => {
		console.log(`http://localhost:3001/api/pricelist/${newPricelist["id"]}`);
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

	if (pricelist)
		return (
			<>
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
				</Routes>
			</>
		);
	else return <></>;
};

export default App;
