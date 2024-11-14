import Modal from "react-bootstrap/Modal";

import ItemDialog from "./ItemDialog";
import ShoppingCartDialog from "./ShoppingCartDialog";
import ContactDataDialog from "./ContactDataDialog";

const Dialog = ({
	show,
	dialogType,
	handleClose,
	handleRedirect,
	handleItemAddition,
}) => {
	let content;
	switch (dialogType) {
		case "ShoppingCartDialog":
			content = <ShoppingCartDialog />;
			break;
		case "ContactDataDialog":
			content = <ContactDataDialog />;
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
