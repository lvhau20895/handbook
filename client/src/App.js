import Auth from "Modules/Layouts/Auth";
import Main from "Modules/Layouts/Main";
import Forgot from "Modules/Pages/Forgot";
import Home from "Modules/Pages/Home";
import Login from "Modules/Pages/Login";
import Register from "Modules/Pages/Register";
import CheckoutRoute from "Modules/Routes/CheckoutRoute";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<CheckoutRoute />}>
					<Route path="/" element={<Main />}>
						<Route index element={<Home />} />
					</Route>
				</Route>

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
