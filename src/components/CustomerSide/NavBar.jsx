import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = () => {
	return (
		<>
			<Navbar
				expand="md"
				fixed="top"
				className="m-0 p-0 vw-100 d-none d-md-block"
			>
				<Container
					className="d-flex align-items-between justify-content-between align-items-start pt-3 ps-3 pe-3 pt-lg-5 ps-lg-5 pe-lg-5"
					style={{
						minWidth: "100%",
					}}
				>
					<Navbar.Brand href="#start" className="m-0 p-0">
						<div
							href="#start"
							style={{
								fontWeight: "bold",
								fontFamily: "Raleway !important",
								fontSize: "20px",
								lineHeight: "25px",
								color: "white",
							}}
						>
							FIX
							<br />
							FOTO
							<br />
							STUDIO
						</div>
					</Navbar.Brand>
					<div>
						<Navbar.Toggle
							className="mb-4"
							aria-controls="basic-navbar-nav"
							style={{ width: 151 }}
						/>
						<Navbar.Collapse
							className="m-0 p-0"
							id="basic-navbar-nav"
							style={{ width: "fit-content", maxWidth: 151 }}
						>
							<Nav className="me-auto d-flex flex-column">
								<Nav.Link href="#passfotos">Passbilder</Nav.Link>
								<Nav.Link href="#bewerbung">Bewerbungsbilder</Nav.Link>
								<Nav.Link href="#portraits">Portraits</Nav.Link>
								<Nav.Link href="#produkte">Fotoprodukte</Nav.Link>
								<Nav.Link href="#rahmen">Rahmen</Nav.Link>
								<Nav.Link href="#labor">Labor</Nav.Link>
								<Nav.Link href="#video">Videokassetten</Nav.Link>
								<Nav.Link href="#glas">3D Glasfoto</Nav.Link>
								<Nav.Link href="#kopien">Kopien</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</div>
				</Container>
			</Navbar>
			<Navbar expand="md" key="md" fixed="top" className="mb-3 d-md-none">
				<Container fluid>
					<Navbar.Brand href="#start" className="m-0 p-0">
						<div
							href="#start"
							style={{
								fontWeight: "bold",
								fontFamily: "Raleway !important",
								fontSize: "20px",
								lineHeight: "25px",
								color: "white",
							}}
						>
							FIX
							<br />
							FOTO
							<br />
							STUDIO
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-md`}
						aria-labelledby={`offcanvasNavbarLabel-expand-md`}
						placement="end"
						className="bg-dark"
						style={{ width: "80vw" }}
					>
						<Offcanvas.Header closeButton style={{ color: "white" }}>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
								Menü
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link href="#passfotos">Passbilder</Nav.Link>
								<Nav.Link href="#bewerbung">Bewerbungsbilder</Nav.Link>
								<Nav.Link href="#portraits">Portraits</Nav.Link>
								<Nav.Link href="#produkte">Fotoprodukte</Nav.Link>
								<Nav.Link href="#rahmen">Rahmen</Nav.Link>
								<Nav.Link href="#labor">Labor</Nav.Link>
								<Nav.Link href="#video">Videokassetten</Nav.Link>
								<Nav.Link href="#glas">3D Glasfoto</Nav.Link>
								<Nav.Link href="#kopien">Kopien</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
