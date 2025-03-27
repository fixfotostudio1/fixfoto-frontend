import { useContext } from "react";
import { ProductSectionContext } from "./CustomerSide";

const findMinValue = (obj) => {
	return Math.min.apply(null, [
		...Object.values(obj).map((item) => parseFloat(item)),
	]);
};

const findMaxValue = (obj) => {
	return Math.max.apply(null, [
		...Object.values(obj).map((item) => parseFloat(item)),
	]);
};

const ProductSection = ({
	seqNumber,
	id,
	callToAction,
	imageSource,
	handleClick,
}) => {
	const ctx = useContext(ProductSectionContext);
	const imageSide = seqNumber % 2 === 0 ? "right" : "left";
	const generateText = (sectionName) => {
		if (!Boolean(ctx.pricelist[sectionName])) {
			return <></>;
		}

		const firstKey = Object.keys(ctx.pricelist[sectionName])[0];
		// If the product doesn't have subtypes.
		const arr = [];
		if (typeof ctx.pricelist[sectionName][firstKey] !== "object") {
			for (const type of Object.keys(ctx.pricelist[sectionName])) {
				arr.push(
					<>
						{type}: € {ctx.pricelist[sectionName][type]}
						<br />
						<br />
					</>
				);
			}
		} else {
			for (const type of Object.keys(ctx.pricelist[sectionName])) {
				if (type === "Sonstiges") {
					for (const subtype of Object.keys(ctx.pricelist[sectionName][type])) {
						arr.push(
							<>
								{subtype}: € {ctx.pricelist[sectionName][type][subtype]}
								<br />
							</>
						);
					}
					arr.push(
						<>
							<br />
						</>
					);
				} else {
					arr.push(
						<>
							<b>{type}</b>
							<br />
						</>
					);
					const fstSubtype = Object.keys(ctx.pricelist[sectionName][type])[0];
					if (fstSubtype.includes(" x ")) {
						arr.push(
							<>
								Größen von {Object.keys(ctx.pricelist[sectionName][type])[0]} cm
								bis{" "}
								{
									Object.keys(ctx.pricelist[sectionName][type])[
										Object.keys(ctx.pricelist[sectionName][type]).length - 1
									]
								}{" "}
								cm
								<br />
								Preise von € {findMinValue(
									ctx.pricelist[sectionName][type]
								)}{" "}
								bis € {findMaxValue(ctx.pricelist[sectionName][type])}
								<br />
							</>
						);
					} else {
						for (const subtype of Object.keys(
							ctx.pricelist[sectionName][type]
						)) {
							arr.push(
								<>
									{subtype}: € {ctx.pricelist[sectionName][type][subtype]}
									<br />
								</>
							);
						}
					}
					arr.push(
						<>
							<br />
						</>
					);
				}
			}
		}
		return <>{...arr}</>;
	};
	//console.log(generateText(id));
	return (
		<>
			<div
				id={id}
				className="d-none d-xl-flex max-vw-100 justify-content-center align-items-center m-0"
				style={{
					top: `${ctx.sectionSize * seqNumber}vh`,
					position: "absolute",
					left: 0,
					height: `${ctx.sectionSize}vh`,
					width: "100vw",
					paddingLeft: "calc(3rem + 85.15px)",
					paddingRight: "calc(3rem + 157.64px)",
					boxSizing: "border-box",
				}}
			>
				<img
					src={imageSource}
					style={{
						width: "30%",
						maxHeight: "60vh",
						objectFit: "contain",
						marginRight: "1.5vw",
						display: imageSide === "left" ? "unset" : "none",
					}}
				/>
				<div
					className="d-flex flex-column justify-content-center"
					style={{
						marginLeft: imageSide === "left" ? "1.5vw" : "0vw",
						marginRight: imageSide === "left" ? "0vw" : "1.5vw",
					}}
				>
					<h1 className="section-title-text">{id.toUpperCase()}</h1>
					<p
						className="smallest-text-unit"
						style={{
							maxWidth: "100%",
							marginBottom: "0px",
						}}
					>
						{generateText(id)}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "100%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
						onClick={handleClick}
					>
						<h5
							style={{
								color: "white",
								fontSize: "16px",
								margin: "0",
								padding: "0",
								marginRight: "20px",
								minWidth: "fit-content",
							}}
						>
							<b>{callToAction}</b>
						</h5>
						<div
							className="line-1"
							style={{
								marginRight: "-11px",
							}}
						></div>
						<div className="d-flex align-items-center">
							<i className="arrow right"></i>
						</div>
					</div>
				</div>
				<img
					src={imageSource}
					style={{
						width: "30%",
						maxHeight: "50vh",
						objectFit: "contain",
						marginLeft: "1.5vw",
						display: imageSide === "left" ? "none" : "unset",
					}}
				/>
			</div>
			<div
				id={id}
				className="d-flex flex-column d-xl-none max-vw-100 justify-content-center align-items-center"
				style={{
					top: `${ctx.sectionSize * seqNumber}vh`,
					position: "absolute",
					left: 0,
					height: `${ctx.sectionSize}vh`,
					width: "100vw",
					boxSizing: "border-box",
				}}
			>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<h1
						className="section-title-text"
						style={{ wordBreak: "break-all", textAlign: "center" }}
					>
						{id.toUpperCase()}
					</h1>
					<img
						src={imageSource}
						style={{
							width: "30vw",
							objectFit: "contain",
							marginBottom: "20px",
						}}
					/>
					<p
						className="smallest-text-unit"
						style={{
							maxWidth: "70%",
							marginBottom: "0px",
						}}
					>
						{generateText(id)}
					</p>
					<div
						className="d-flex align-items-center arrow-container"
						style={{
							maxWidth: "70%",
							marginTop: "10px",
							marginBottom: "10px",
						}}
						onClick={handleClick}
					>
						<h5
							style={{
								color: "white",
								fontSize: "16px",
								margin: "0",
								padding: "0",
								marginRight: "20px",
							}}
						>
							<b>{callToAction}</b>
						</h5>
						<div
							className="line-1"
							style={{
								marginRight: "-11px",
							}}
						></div>
						<div className="d-flex align-items-center">
							<i className="arrow right"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSection;
