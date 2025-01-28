import Modal from "react-bootstrap/Modal";
import { useState, useRef, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";

import ItemDialog from "./ItemDialog";
import CartAndCheckoutDialog from "./CartAndCheckoutDialog";
import PostPaymentInfoDialog from "./PostPaymentInfoDialog";

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
	clientSecret,
	fetchClientSecret,
	stripePromise,
}) => {
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
					deleteItem={deleteItem}
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
