import Modal from "react-bootstrap/Modal";

const InfoDialog = ({ dialogType }) => {
	switch (dialogType) {
		case "AGBDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>AGB</Modal.Title>
					</Modal.Header>
					<Modal.Body></Modal.Body>
				</>
			);
		case "ImpressumDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>Impressum</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Angaben gemäß § 5 TMG:
						<br />
						<br />
						Fix Foto Studio1
						<br />
						Fotolabor Frankfurt
						<br />
						Grüneburgweg 8
						<br />
						60322 Frankfurt am Main
						<br />
						<br />
						Inhaber: N. Eker
					</Modal.Body>
				</>
			);
		case "DatenschutzDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>Datenschutz</Modal.Title>
					</Modal.Header>
					<Modal.Body></Modal.Body>
				</>
			);
	}
};

export default InfoDialog;
