import Auth from "Layouts/Auth";
import Main from "Layouts/Main";
import Stories from "Pages/Stories";
import Forgot from "Pages/Forgot";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import CheckoutRoute from "Routes/CheckoutRoute";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<CheckoutRoute />}>
					<Route path="/" element={<Main />}>
						<Route index element={<Home />} />
						<Route path="/stories" element={<Stories />} />
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
