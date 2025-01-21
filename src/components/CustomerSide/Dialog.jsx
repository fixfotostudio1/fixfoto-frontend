import Modal from "react-bootstrap/Modal";
import { useState, useRef, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { STRIPE_PUBLISHABLE_KEY } from "../../utils/config";

import ItemDialog from "./ItemDialog";
import CartAndCheckoutDialog from "./CartAndCheckoutDialog";
import PostPaymentInfoDialog from "./PostPaymentInfoDialog";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Dialog = ({
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
	const [clientSecret, setClientSecret] = useState(null);
	const clientSecretRef = useRef({ current: clientSecret });
	clientSecretRef.current = clientSecret;

	const fetchClientSecret = () => {
		if (!clientSecretRef.current) {
			axios
				.post("http://localhost:3001/api/orders/", {
					items: order.items,
					deliveryType: order.deliveryType,
				})
				.then((result) => {
					console.log("clientSecretRef.current:", clientSecretRef.current);
					changeOrderNumber();
					setClientSecret(result["data"]["client_secret"]);
				});
		}
	};
	let content;

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

	switch (dialogType) {
		case "PostPaymentInfoDialog":
			content = (
				<PostPaymentInfoDialog
					handleClose={handleClose}
					order={order}
					orderSuccess={orderSuccess}
				/>
			);
			break;
		case "CartAndCheckoutDialog":
			if (!clientSecret) {
				content = (
					<CartAndCheckoutDialog
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
					/>
				);
			} else {
				content = (
					<Elements
						stripe={stripePromise}
						options={{ clientSecret: clientSecret }}
					>
						<CartAndCheckoutDialog
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
						/>
					</Elements>
				);
			}

			break;
		default:
			content = (
				<ItemDialog
					handleRedirect={handleRedirect}
					itemType={dialogType}
					pricelist={pricelist}
					addItem={addItem}
				/>
			);
	}

	return (
		<Modal show={showDialog} onHide={handleClose} animation={true} centered>
			{content}
		</Modal>
	);
};

export default Dialog;
