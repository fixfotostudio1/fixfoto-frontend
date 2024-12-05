import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentDialog = ({ handleClose }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const { error } = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: "https://example.com/order/123/complete",
			},
		});

		if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			setErrorMessage(error.message);
		} else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Zahlungsart wählen</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<PaymentElement />
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={!stripe}>Submit</Button>
				{/* Show error message to your customers */}
				{errorMessage && <div>{errorMessage}</div>}
			</Modal.Footer>
		</>
	);
};

export default PaymentDialog;
