const ShoppingCartDialog = () => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Warenkorb</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Weiter einkaufen
				</Button>
				<Button variant="primary" onClick={() => handleRedirect("personal")}>
					Bestellen
				</Button>
			</Modal.Footer>
		</>
	);
};

export default ShoppingCartDialog;
