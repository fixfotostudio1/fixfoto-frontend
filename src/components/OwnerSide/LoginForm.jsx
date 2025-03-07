import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = ({ handleLogin, setPassword, setUsername }) => {
	return (
		<Modal
			show={true}
			animation={true}
			centered
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					handleLogin();
				}
			}}
		>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>username:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</Form.Group>
				<Form.Group className="d-flex justify-content-between align-items-center mt-3">
					<Form.Label style={{ padding: 0, margin: 0 }}>password:</Form.Label>
					<Form.Control
						style={{ width: "70%" }}
						onChange={({ target }) => setPassword(target.value)}
						type="password"
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => handleLogin()}>
					Einloggen
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LoginForm;
