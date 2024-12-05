import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DeliveryTypeDialog = ({
	handleClose,
	handleRedirect,
	changeOrder,
	order,
}) => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Versandart</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<div key="inline-radio" className="mb-3">
						<Form.Check
							label="Abholen"
							name="group1"
							type="radio"
							id="inline-radio-1"
							onChange={({ target }) => {
								console.log("Abholen: ", target.value === "on");
								if (target.value === "on")
									changeOrder({ ...order, deliveryType: "Abholen" });
							}}
						/>
						<Form.Check
							label="Hermes-Versand"
							name="group1"
							type="radio"
							id="inline-radio-2"
							onChange={({ target }) => {
								console.log("Hermes-Versandart: ", target.value === "on");
								if (target.value === "on")
									changeOrder({ ...order, deliveryType: "Hermes-Versandart" });
							}}
						/>
					</div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary">Zurück zum Warenkorb</Button>
				<Button
					variant="primary"
					onClick={() => handleRedirect("DeliveryAddressDialog")}
				>
					Lieferadresse angeben
				</Button>
			</Modal.Footer>
		</>
	);
};

export default DeliveryTypeDialog;
