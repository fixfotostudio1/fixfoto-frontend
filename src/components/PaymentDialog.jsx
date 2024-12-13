import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentDialog = ({ order }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmit = async () => {
		if (!stripe || !elements) {
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "https://example.com/order/123/complete",
			},
		});

		if (error) {
			setErrorMessage(error.message);
		} else {
		}
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Zahlungsart wählen</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PaymentElement />
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={!stripe} onClick={handleSubmit}>
					Submit
				</Button>
				{/* Show error message to your customers */}
				{errorMessage && <div>{errorMessage}</div>}
			</Modal.Footer>
		</>
	);
};

export default PaymentDialog;
