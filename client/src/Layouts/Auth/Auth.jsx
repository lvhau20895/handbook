import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "Components/Logo";
import Theme from "Components/Theme";
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

			<p className={style.copyright}>© 2023 HandBook, App v1.0.</p>
		</div>
	);
};

export default Auth;
