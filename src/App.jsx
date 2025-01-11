import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { uploadFile } from "react-s3";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import CustomerSide from "./components/CustomerSide/CustomerSide";
import OwnerSide from "./components/OwnerSide";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	S3_BUCKET,
	REGION,
} from "./utils/config";

const App = () => {
	const [pricelist, setPricelist] = useState(null);

	const uploadImages = (images) => {
		const orderNumber = Date.now().toString();

		for (const image of images) {
			uploadFile(image, {
				bucketName: S3_BUCKET,
				region: REGION,
				accessKeyId: AWS_ACCESS_KEY,
				secretAccessKey: AWS_SECRET_ACCESS_KEY,
			})
				.then((data) => console.log(data))
				.catch((error) => console.error(error));
		}
	};

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
					<Route
						path="/success"
						element={<CustomerSide pricelist={pricelist} orderSuccess={true} />}
					/>
				</Routes>
			</>
		);
	else return <></>;
};

export default App;
