import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import ShoppingCartDialog from "./ShoppingCartDialog";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import PaymentDialog from "./PaymentDialog";
import DeliveryTypeDialog from "./DeliveryTypeDialog";
import OverviewDialog from "./OverviewDialog";
import { useState } from "react";

import { STRIPE_PUBLISHABLE_KEY, CLIENT_SECRET } from "../utils/config";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
import axios from "axios";

const Dialog = ({
	show,
	dialogType,
	handleClose,
	handleRedirect,
	changeOrder,
	order,
	pricelist,
	addItem,
	deleteItem,
	updateDeliveryAddress,
	getClientSecret,
}) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [toggle, setToggle] = useState(true);
	let content;

	const fetchClientSecret = () => {
		axios
			.post("http://localhost:3001/api/orders/", {
				items: order.items,
				deliveryType: order.deliveryType,
			})
			.then((result) => {
				setClientSecret(result["data"]["client_secret"]);
			});
	};

	switch (dialogType) {
		case "ShoppingCartDialog":
			content = (
				<ShoppingCartDialog
					handleClose={handleClose}
					handleRedirect={handleRedirect}
					order={order}
					deleteItem={deleteItem}
				/>
			);
			break;
		case "DeliveryAddressDialog":
			content = (
				<DeliveryAddressDialog
					handleRedirect={handleRedirect}
					updateDeliveryAddress={updateDeliveryAddress}
					order={order}
				/>
			);
			break;
		case "PaymentDialog":
			if (!clientSecret) {
				axios
					.post("http://localhost:3001/api/orders/", {
						items: order.items,
						deliveryType: order.deliveryType,
					})
					.then((result) => {
						setClientSecret(result["data"]["client_secret"]);
					})
					.then(() => {
						console.log("clS none: ", clientSecret);
						content = (
							<Elements
								stripe={stripePromise}
								options={{ clientSecret: clientSecret }}
							>
								<PaymentDialog handleRedirect={handleRedirect} order={order} />
							</Elements>
						);
						setToggle(!toggle);
					});
			} else {
				console.log("clS: ", clientSecret);
				content = (
					<Elements
						stripe={stripePromise}
						options={{ clientSecret: clientSecret }}
					>
						<PaymentDialog handleRedirect={handleRedirect} order={order} />
					</Elements>
				);
			}

			break;
		case "DeliveryTypeDialog":
			content = (
				<DeliveryTypeDialog
					handleRedirect={handleRedirect}
					changeOrder={changeOrder}
					order={order}
				/>
			);
			break;
		case "OverviewDialog":
			content = (
				<OverviewDialog
					order={order}
					handleRedirect={handleRedirect}
					getClientSecret={getClientSecret}
				/>
			);
			break;
		default:
			content = (
				<ItemDialog
					itemType={dialogType}
					handleItemAddition={changeOrder}
					handleRedirect={handleRedirect}
					pricelist={pricelist}
					order={order}
					addItem={addItem}
				/>
			);
	}

	return (
		<Modal show={show} onHide={handleClose} animation={true} centered>
			{content}
		</Modal>
	);
};

export default Dialog;
