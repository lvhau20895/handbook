import { Route, Routes } from "react-router-dom";
import NotificationProvider from "Contexts/NotificationProvider";
import CheckoutRoute from "./CheckoutRoute";
import Auth from "Layouts/Auth";
import Main from "Layouts/Main";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Forgot from "Pages/Forgot";

const App = () => {
	return (
		<NotificationProvider>
			<Routes>
				<Route element={<CheckoutRoute />}>
					<Route path="/" element={<Main />} />
				</Route>

				<Route path="/" element={<Auth />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot" element={<Forgot />} />
				</Route>
			</Routes>
		</NotificationProvider>
	);
};

export default App;
