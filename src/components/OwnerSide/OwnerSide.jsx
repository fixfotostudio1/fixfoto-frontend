import { createContext, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

import {
	S3Client,
	S3ServiceException,
	DeleteObjectsCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3_BUCKET, REGION, AWS_IDENTITY_POOL_ID } from "../../utils/config";

import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import DeleteDialog from "./DeleteDialog";

export const DashboardContext = createContext({});

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
	const [deleteOrRefund, setDeleteOrRefund] = useState(null);

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
		try {
			const response = await client.send(
				new DeleteObjectsCommand({
					Bucket: S3_BUCKET,
					Delete: {
						Objects: keys.map((k) => ({ Key: k })),
					},
				})
			);
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

	const AWSObj2ImageURL = async (orderNumber, S3TempName) => {
		const response = await client.send(
			new GetObjectCommand({
				Bucket: S3_BUCKET,
				Key: orderNumber + "-" + S3TempName,
			})
		);

		const byteArr = await response.Body.transformToByteArray();
		const file = new File(
			[byteArr],
			orderNumber + "-" + S3TempName.split("-")[0],
			{
				type: S3TempName.split("-")[1],
			}
		);
		const reader = new FileReader();
		let url = "";
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			url = e.target.result;

			const a = document.createElement("a");
			const el = new MouseEvent("click");
			a.download = orderNumber + "-" + S3TempName;
			a.href = e.target.result;
			a.dispatchEvent(el);
		};
		return url;
	};

	const refundOrder = (order) => {
		axios.post(
			`http://localhost:3001/api/orders/refund`,
			{
				...order,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	};

	return (
		<>
			{!token ? (
				<LoginForm
					handleLogin={() => handleLogin(username, password)}
					setPassword={setPassword}
					setUsername={setUsername}
				/>
			) : (
				<>
					<Button
						onClick={() => {
							updateOrders(token);
						}}
					>
						Bestellungen neu laden
					</Button>
					<DashboardContext.Provider
						value={{
							AWSObj2ImageURL: AWSObj2ImageURL,
							handleClick: (order, newStatus) => {
								changeStatus(order, token, newStatus);
							},
							handleDelete: (setting, order) => {
								setDeleteOrRefund(setting);
								setOrderToBeDeleted(order);
								setShowDeleteDialog(true);
							},
							modifiedPricelist: modifiedPricelist,
							orders: orders,
							setModifiedPricelist: setModifiedPricelist,
							handlePricelistChange: handlePricelistChange,
						}}
					>
						<Dashboard token={token} />
					</DashboardContext.Provider>
					<DeleteDialog
						deleteOrRefund={deleteOrRefund}
						showDeleteDialog={showDeleteDialog}
						handleClose={() => {
							setShowDeleteDialog(false);
							setOrderToBeDeleted(null);
						}}
						orderToBeDeleted={orderToBeDeleted}
						handleDelete={() => {
							if (deleteOrRefund === "refund") {
								refundOrder(orderToBeDeleted);
							}
							deleteOrderFilesFromBucket(orderToBeDeleted);
							deleteOrderFromDb(orderToBeDeleted, token);
							setShowDeleteDialog(false);
						}}
					/>
				</>
			)}
		</>
	);
};

export default OwnerSide;
