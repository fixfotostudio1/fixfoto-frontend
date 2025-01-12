import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import CartAndCheckoutDialog from "./CartAndCheckoutDialog";

const Dialog = ({
	showDialog,
	dialogType,
	handleClose,
	handleRedirect,
	order,
	pricelist,
	addItem,
	deleteItem,
	changeDeliveryAddress,
	changeDeliveryType,
	submitPayment,
}) => {
	let content;

	switch (dialogType) {
		case "CartAndCheckoutDialog":
			content = (
				<CartAndCheckoutDialog
					handleClose={handleClose}
					order={order}
					pricelist={pricelist}
					deleteItem={deleteItem}
					changeDeliveryAddress={changeDeliveryAddress}
					changeDeliveryType={changeDeliveryType}
					submitPayment={submitPayment}
				/>
			);
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

	console.log("Dialog before return");

	return (
		<Modal show={showDialog} onHide={handleClose} animation={true} centered>
			{content}
		</Modal>
	);
};

export default Dialog;
