import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import ShoppingCartDialog from "./ShoppingCartDialog";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import PaymentDialog from "./PaymentDialog";
import DeliveryTypeDialog from "./DeliveryTypeDialog";
import OverviewDialog from "./OverviewDialog";

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
}) => {
	let content;
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
			content = (
				<PaymentDialog
					handleClose={handleClose}
					handleRedirect={handleRedirect}
				/>
			);
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
				<OverviewDialog order={order} handleRedirect={handleRedirect} />
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
