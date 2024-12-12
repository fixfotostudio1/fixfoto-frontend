import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DeliveryTypeDialog = ({ handleRedirect, changeOrder, order }) => {
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
							checked={order["deliveryType"] === "Abholen"}
							onChange={({ target }) => {
								if (target.value === "on")
									changeOrder({ ...order, deliveryType: "Abholen" });
							}}
						/>
						<Form.Check
							label="Hermes-Versand"
							name="group1"
							type="radio"
							id="inline-radio-2"
							checked={order["deliveryType"] === "Hermes-Versand"}
							onChange={({ target }) => {
								if (target.value === "on")
									changeOrder({ ...order, deliveryType: "Hermes-Versand" });
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
