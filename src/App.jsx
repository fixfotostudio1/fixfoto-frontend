import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerSide from "./components/CustomerSide";
import OwnerSide from "./components/OwnerSide";
const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<CustomerSide />} />
				<Route path="/login" element={<OwnerSide />} />
			</Routes>
		</>
	);
};

export default App;
