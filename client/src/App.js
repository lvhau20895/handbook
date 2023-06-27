import { Routes, Route } from "react-router-dom";
import CheckoutRoute from "Routes/CheckoutRoute";
import Auth from "Layouts/Auth";
import Main from "Layouts/Main";
import Forgot from "Pages/Forgot";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Stories from "Pages/Stories";
import StoryType from "Pages/StoryType";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<CheckoutRoute />}>
					<Route path="/" element={<Main />}>
						<Route index element={<Home />} />
						<Route path="/stories" element={<Stories />} />
						<Route path="/stories/:type" element={<StoryType />} />
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
