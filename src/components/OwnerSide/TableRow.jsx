import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

import { S3_BUCKET, REGION, AWS_IDENTITY_POOL_ID } from "../../utils/config";

const TableRow = ({ item, handleClick, handleDelete, statusesArray }) => {
	const client = new S3Client({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: { region: REGION },
			identityPoolId: AWS_IDENTITY_POOL_ID,
		}),
	});

	const AWSObj2ImageURL = async (orderNumber, S3TempName) => {
		const response = await client.send(
			new GetObjectCommand({
				Bucket: S3_BUCKET,
				Key: orderNumber + "-" + S3TempName,
			})
		);
		// The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
		const byteArr = await response.Body.transformToByteArray();
		const file = new File([byteArr], orderNumber + "-" + S3TempName, {
			type: "image/jpeg",
		});
		const reader = new FileReader();
		let url = "";
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			console.log("OwnerSide e.target.result: ", e.target.result);
			url = e.target.result;

			const a = document.createElement("a");
			const el = new MouseEvent("click");
			a.download = orderNumber + "-" + S3TempName;
			a.href = e.target.result;
			a.dispatchEvent(el);
		};
		return url;
	};

	let buttonText = "";
	if (item["status"] === "abholbereit" || item["status"] === "versandbereit") {
		buttonText = "abgeschlossen";
	} else if (item["status"] === "neu" && item["deliveryType"] === "Abholen") {
		buttonText = "abholbereit";
	} else if (
		item["status"] === "neu" &&
		item["deliveryType"] === "Hermes-Versand"
	) {
		buttonText = "versandbereit";
	} else if (item["status"] === "abgeschlossen") {
		buttonText = "löschen";
	}
	return (
		<tr>
			<td>{item["orderNumber"]}</td>
			<td>
				<ul>
					{...item["items"].map((i) => (
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
									AWSObj2ImageURL(item["orderNumber"], i["S3TempName"])
								}
								style={{ color: "blue", backgroundColor: "white" }}
							>
								Bild herunterladen
							</Button>
						</li>
					))}
				</ul>
			</td>
			<td>{item["deliveryType"]}</td>
			<td>
				{item["deliveryAddress"]["firstName"] +
					" " +
					item["deliveryAddress"]["surname"]}
				<br />
				{item["deliveryAddress"]["mobile"]}
				<br />
				{item["deliveryAddress"]["email"]}
				{item["deliveryType"] !== "Abholen" ? (
					<>
						<br />
						{item["deliveryAddress"]["street"] +
							" " +
							item["deliveryAddress"]["houseNumber"]}
						<br />
						{item["deliveryAddress"]["ZIPCode"] +
							" " +
							item["deliveryAddress"]["city"]}
						<br />
						{item["deliveryAddress"]["country"]}{" "}
					</>
				) : (
					<></>
				)}
			</td>
			<td>
				<Dropdown>
					<Button
						onClick={() => {
							if (statusesArray[0] === "löschen") {
								handleDelete();
							} else {
								handleClick(statusesArray[0]);
							}
						}}
						style={{ width: "70%", minWidth: "fit-content" }}
					>
						{statusesArray[0]}
					</Button>
					<Dropdown.Toggle
						variant="success"
						id="dropdown-basic"
						style={{ width: "30%", minWidth: "fit-content" }}
					></Dropdown.Toggle>

					<Dropdown.Menu>
						{statusesArray.slice(1).map((item) => {
							if (item === "löschen") {
								return (
									<Dropdown.Item onClick={() => handleDelete()}>
										{item}
									</Dropdown.Item>
								);
							}
							return (
								<Dropdown.Item onClick={() => handleClick(item)}>
									{item}
								</Dropdown.Item>
							);
						})}
					</Dropdown.Menu>
				</Dropdown>
			</td>
		</tr>
	);
};

export default TableRow;
