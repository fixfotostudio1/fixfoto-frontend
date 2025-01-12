const NavBar = () => {
	return (
		<div
			id="navigation-bar"
			className="d-flex position-fixed top-0 left-0 vw-100 vh-10"
		>
			<a
				href="#start"
				style={{
					fontWeight: "bold",
					fontFamily: "Raleway !important",
					fontSize: "20px",
					position: "fixed",
					top: "50px",
					left: "50px",
					lineHeight: "25px",
					color: "white",
				}}
			>
				FIX
				<br />
				FOTO
				<br />
				STUDIO
			</a>
			<div
				className="d-flex flex-column align-items-end"
				style={{
					position: "fixed",
					top: "50px",
					right: "50px",
					lineHeight: "25px",
				}}
			>
				<a href="#passfotos">Passbilder</a>
				<a href="#bewerbung">Bewerbungsbilder</a>
				<a href="#portraits">Portraits</a>
				<a href="#produkte">Fotoprodukte</a>
				<a href="#rahmen">Rahmen</a>
				<a href="#labor">Labor</a>
				<a href="#video">Videokassetten</a>
				<a href="#glas">3D Glasfoto</a>
				<a href="#kopien">Kopien</a>
			</div>
		</div>
	);
};

export default NavBar;
