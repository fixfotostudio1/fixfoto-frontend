import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = ({ currBackground }) => {
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
								<a
									class={
										currBackground === "passfotos-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight)}
								>
									Passbilder
								</a>
								<a
									class={
										currBackground === "bewerbung-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 2)}
								>
									Bewerbungsbilder
								</a>
								<a
									class={
										currBackground === "portraits-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 3)}
								>
									Portraits
								</a>
								<a
									class={
										currBackground === "produkte-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 4)}
								>
									Fotoprodukte
								</a>
								<a
									class={
										currBackground === "rahmen-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 5)}
								>
									Rahmen
								</a>
								<a
									class={
										currBackground === "labor-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 6)}
								>
									Labor
								</a>
								<a
									class={
										currBackground === "video-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 7)}
								>
									Videokassetten
								</a>
								<a
									class={
										currBackground === "glas-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 8)}
								>
									3D Glasfoto
								</a>
								<a
									class={
										currBackground === "kopien-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 9)}
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
							STUDIO
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
									class={
										currBackground === "passfotos-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight)}
								>
									Passbilder
								</a>
								<a
									class={
										currBackground === "bewerbung-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 2)}
								>
									Bewerbungsbilder
								</a>
								<a
									class={
										currBackground === "portraits-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 3)}
								>
									Portraits
								</a>
								<a
									class={
										currBackground === "produkte-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 4)}
								>
									Fotoprodukte
								</a>
								<a
									class={
										currBackground === "rahmen-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 5)}
								>
									Rahmen
								</a>
								<a
									class={
										currBackground === "labor-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 6)}
								>
									Labor
								</a>
								<a
									class={
										currBackground === "video-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 7)}
								>
									Videokassetten
								</a>
								<a
									class={
										currBackground === "glas-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 8)}
								>
									3D Glasfoto
								</a>
								<a
									class={
										currBackground === "kopien-background"
											? "navlink navlink-in-view"
											: "navlink"
									}
									onClick={() => window.scrollTo(0, window.innerHeight * 9)}
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
