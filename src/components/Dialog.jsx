import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import ShoppingCartDialog from "./ShoppingCartDialog";
import ContactDataDialog from "./ContactDataDialog";
import PaymentDialog from "./PaymentDialog";

const Dialog = ({
	show,
	dialogType,
	handleClose,
	handleRedirect,
	handleItemAddition,
	shoppingCartContent,
}) => {
	let content;
	switch (dialogType) {
		case "ShoppingCartDialog":
			content = (
				<ShoppingCartDialog
					handleClose={handleClose}
					shoppingCartContent={shoppingCartContent}
				/>
			);
			break;
		case "ContactDataDialog":
			content = (
				<ContactDataDialog
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
		default:
			content = (
				<ItemDialog
					itemType={dialogType}
					handleItemAddition={handleItemAddition}
					handleRedirect={handleRedirect}
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
