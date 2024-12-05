import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import ShoppingCartDialog from "./ShoppingCartDialog";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import PaymentDialog from "./PaymentDialog";
import DeliveryTypeDialog from "./DeliveryTypeDialog";

const Dialog = ({
	show,
	dialogType,
	handleClose,
	handleRedirect,
	changeOrder,
	order,
	pricelist,
}) => {
	let content;
	switch (dialogType) {
		case "ShoppingCartDialog":
			content = (
				<ShoppingCartDialog
					handleClose={handleClose}
					handleRedirect={handleRedirect}
					order={order}
				/>
			);
			break;
		case "DeliveryAddressDialog":
			content = (
				<DeliveryAddressDialog
					handleClose={handleClose}
					handleRedirect={handleRedirect}
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
					handleClose={handleClose}
					handleRedirect={handleRedirect}
					changeOrder={changeOrder}
					order={order}
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
