import Auth from "Modules/Layouts/Auth";
import Forgot from "Modules/Pages/Forgot";
import Login from "Modules/Pages/Login";
import Register from "Modules/Pages/Register";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Auth />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot" element={<Forgot />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
