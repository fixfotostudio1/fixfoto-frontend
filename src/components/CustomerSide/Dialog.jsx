import Modal from "react-bootstrap/Modal";
import { useState, useRef } from "react";
import axios from "axios";

import ItemDialog from "./ItemDialog";
import CartAndCheckoutDialog from "./CartAndCheckoutDialog";
import PostPaymentInfoDialog from "./PostPaymentInfoDialog";
import InfoDialog from "./InfoDialog";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/config";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Dialog = ({
	AGBAgreement,
	setAGBAgreement,
	showDialog,
	dialogType,
	handleClose,
	handleRedirect,
	order,
	orderSuccess,
	pricelist,
	addItem,
	deleteItem,
	changeOrderNumber,
	changeAmount,
	changeDeliveryAddress,
	changeDeliveryType,
}) => {
	let content;

	const [clientSecret, setClientSecret] = useState(null);
	const clientSecretRef = useRef({ current: clientSecret });
	clientSecretRef.current = clientSecret;

	const fetchClientSecret = (order) => {
		if (!clientSecretRef.current) {
			axios
				.post("http://localhost:3001/api/orders/fetchClientSecret", {
					items: order.items,
					deliveryType: order.deliveryType,
				})
				.then((result) => {
					setClientSecret(result["data"]["client_secret"]);
				});
		}
	};

	const [alwaysActiveList, setAlwaysActiveList] = useState(["0"]);
	const toggleActivity = (element) => {
		if (alwaysActiveList.indexOf(element) === -1) {
			const newAlwaysActiveList = alwaysActiveList.concat([element]);
			setAlwaysActiveList(newAlwaysActiveList);
		} else {
			const newAlwaysActiveList = alwaysActiveList
				.slice(alwaysActiveList.indexOf(element))
				.concat(alwaysActiveList.slice(alwaysActiveList.indexOf(element) + 1));
			setAlwaysActiveList(newAlwaysActiveList);
		}
	};

	const cancelIntent = () => {
		if (clientSecret) {
			axios.post("http://localhost:3001/api/orders/cancelPaymentIntent", {
				intentId: clientSecret.split("_secret_")[0],
			});
			setClientSecret(null);
			if (alwaysActiveList.includes("3")) {
				setAlwaysActiveList(
					alwaysActiveList
						.slice(0, alwaysActiveList.indexOf("3"))
						.concat(alwaysActiveList.slice(alwaysActiveList.indexOf("3") + 1))
				);
			}
		}
	};

	switch (dialogType) {
		case "PostPaymentInfoDialog":
			content = (
				<PostPaymentInfoDialog
					handleClose={handleClose}
					order={order}
					orderSuccess={orderSuccess}
					deleteItem={deleteItem}
				/>
			);
			break;
		case "CartAndCheckoutDialog":
			content = (
				<CartAndCheckoutDialog
					AGBAgreement={AGBAgreement}
					setAGBAgreement={setAGBAgreement}
					handleClose={handleClose}
					order={order}
					pricelist={pricelist}
					changeAmount={changeAmount}
					deleteItem={deleteItem}
					changeOrderNumber={changeOrderNumber}
					changeDeliveryAddress={changeDeliveryAddress}
					changeDeliveryType={changeDeliveryType}
					clientSecret={clientSecret}
					fetchClientSecret={fetchClientSecret}
					alwaysActiveList={alwaysActiveList}
					toggleActivity={toggleActivity}
					cancelIntent={cancelIntent}
					handleRedirect={handleRedirect}
				/>
			);
			if (clientSecret) {
				content = (
					<Elements
						stripe={stripePromise}
						options={{ clientSecret: clientSecretRef.current }}
					>
						{content}
					</Elements>
				);
			}

			break;
		case "AGBDialog":
		case "ImpressumDialog":
		case "DatenschutzDialog":
		case "LocationDialog":
		case "AGBDialogReversible":
			content = <InfoDialog dialogType={dialogType} />;
			break;
		default:
			content = (
				<ItemDialog
					handleRedirect={handleRedirect}
					itemType={dialogType}
					pricelist={pricelist}
					addItem={addItem}
					cancelIntent={cancelIntent}
				/>
			);
	}

	return (
		<Modal
			show={showDialog}
			onHide={() => {
				if (dialogType.includes("Reversible")) {
					handleRedirect("CartAndCheckoutDialog");
				} else {
					handleClose();
				}
			}}
			animation={true}
			centered
		>
			{content}
		</Modal>
	);
};

export default Dialog;
