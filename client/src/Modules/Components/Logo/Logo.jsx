import React from "react";
import logo from "./logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div className={logo.logo}>
			<Link to="/">
				<img src="/images/logo/logo.png" alt="logo" />
			</Link>
		</div>
	);
};

export default Logo;
