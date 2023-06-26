import { Routes, Route } from "react-router-dom";
import CheckoutRoute from "Routes/CheckoutRoute";
import Auth from "Layouts/Auth";
import Main from "Layouts/Main";
import Forgot from "Pages/Forgot";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Stories from "Pages/Stories";
import StoryText from "Pages/StoryText";
import StoryImage from "Pages/StoryImage";
import StoryVideo from "Pages/StoryVideo";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<CheckoutRoute />}>
					<Route path="/" element={<Main />}>
						<Route index element={<Home />} />
						<Route path="/stories" element={<Stories />}>
							<Route path="text" element={<StoryText />} />
							<Route path="image" element={<StoryImage />} />
							<Route path="video" element={<StoryVideo />} />
						</Route>
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
