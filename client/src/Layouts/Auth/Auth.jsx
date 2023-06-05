import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "Components/Logo";
import Theme from "Components/Theme";
import Copyright from "Components/Copyright";
import style from "./auth.module.scss";

const Auth = () => {
	const { token } = useSelector(state => state.user);

	if (token) {
		return <Navigate to="/" />;
	}

	return (
		<div className={style.auth}>
			<div className={style.header}>
				<Logo />
				<Theme />
			</div>

			<Outlet />

			<div className={style.copyright}>
				<Copyright />
			</div>
		</div>
	);
};

export default Auth;
