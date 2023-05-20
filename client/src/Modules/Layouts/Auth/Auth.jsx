import React from "react";
import { Outlet } from "react-router-dom";
import auth from "./auth.module.scss";
import Logo from "Modules/Components/Logo";
import Theme from "Modules/Components/Theme";

const Auth = () => {
	return (
		<div className={auth.auth}>
			<div className={auth.switchMode}>
				<Logo />
				<Theme />
			</div>

			<Outlet />

			<p className={auth.copyright}>© 2023 HandBook, App v1.0.</p>
		</div>
	);
};

export default Auth;
