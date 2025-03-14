import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = ({ currBackground, sectionSize }) => {
	return (
		<>
			<Navbar
				expand="lg"
				fixed="top"
				className="m-0 p-0 vw-100 d-none d-lg-block"
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
							STUDIO1
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
								<a
									className={
										currBackground === "passfotos-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) +
												window.innerHeight * 0.15
										)
									}
								>
									Passbilder
								</a>
								<a
									className={
										currBackground === "bewerbung-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 2 +
												window.innerHeight * 0.15
										)
									}
								>
									Bewerbungsbilder
								</a>
								<a
									className={
										currBackground === "portraits-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 3 +
												window.innerHeight * 0.15
										)
									}
								>
									Portraits
								</a>
								<a
									className={
										currBackground === "produkte-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 4 +
												window.innerHeight * 0.15
										)
									}
								>
									Fotoprodukte
								</a>
								<a
									className={
										currBackground === "rahmen-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 5 +
												window.innerHeight * 0.15
										)
									}
								>
									Rahmen
								</a>
								<a
									className={
										currBackground === "labor-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 6 +
												window.innerHeight * 0.15
										)
									}
								>
									Labor
								</a>
								<a
									className={
										currBackground === "video-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 7 +
												window.innerHeight * 0.15
										)
									}
								>
									Videokassetten
								</a>
								<a
									className={
										currBackground === "glas-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 8 +
												window.innerHeight * 0.15
										)
									}
								>
									3D Glasfoto
								</a>
								<a
									className={
										currBackground === "kopien-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 9 +
												window.innerHeight * 0.15
										)
									}
								>
									Kopien
								</a>
							</Nav>
						</Navbar.Collapse>
					</div>
				</Container>
			</Navbar>
			<Navbar expand="lg" key="lg" fixed="top" className="mb-3 d-lg-none">
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
							STUDIO1
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-lg`}
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement="end"
						className="bg-dark"
					>
						<Offcanvas.Header closeButton style={{ color: "white" }}>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
								Menü
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<a
									className={
										currBackground === "passfotos-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) +
												window.innerHeight * 0.15
										)
									}
								>
									Passbilder
								</a>
								<a
									className={
										currBackground === "bewerbung-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 2 +
												window.innerHeight * 0.15
										)
									}
								>
									Bewerbungsbilder
								</a>
								<a
									className={
										currBackground === "portraits-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 3 +
												window.innerHeight * 0.15
										)
									}
								>
									Portraits
								</a>
								<a
									className={
										currBackground === "produkte-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 4 +
												window.innerHeight * 0.15
										)
									}
								>
									Fotoprodukte
								</a>
								<a
									className={
										currBackground === "rahmen-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 5 +
												window.innerHeight * 0.15
										)
									}
								>
									Rahmen
								</a>
								<a
									className={
										currBackground === "labor-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 6 +
												window.innerHeight * 0.15
										)
									}
								>
									Labor
								</a>
								<a
									className={
										currBackground === "video-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 7 +
												window.innerHeight * 0.15
										)
									}
								>
									Videokassetten
								</a>
								<a
									className={
										currBackground === "glas-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 8 +
												window.innerHeight * 0.15
										)
									}
								>
									3D Glasfoto
								</a>
								<a
									className={
										currBackground === "kopien-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() =>
										window.scrollTo(
											0,
											window.innerHeight * (sectionSize / 100) * 9 +
												window.innerHeight * 0.15
										)
									}
								>
									Kopien
								</a>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
