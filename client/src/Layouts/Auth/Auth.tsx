import Wrap from "Components/Wrap";
import Logo from "Components/Logo";
import Theme from "Components/Theme";
import Copyright from "Components/Copyright";
import { useAppSelector } from "store";
import { Navigate, Outlet } from "react-router-dom";
import style from "./auth.module.scss";

const Auth = () => {
	const { token } = useAppSelector(state => state.user);

	if (token) return <Navigate to="/" />;

	return (
		<Wrap className={style.auth}>
			<header>
				<Logo width={60} height={60} />
				<Theme />
			</header>

			<Wrap className={style.main}>
				<Outlet />
			</Wrap>

			<footer>
				<Copyright />
			</footer>
		</Wrap>
	);
};

export default Auth;
