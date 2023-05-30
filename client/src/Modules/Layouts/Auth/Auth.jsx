import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "Modules/Components/Logo";
import Theme from "Modules/Components/Theme";
import style from "./auth.module.scss";

const Auth = () => {
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
