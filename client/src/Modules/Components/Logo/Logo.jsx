import React from "react";
import { Link } from "react-router-dom";
import style from "./logo.module.scss";

const Logo = () => {
	return (
		<div className={style.logo}>
			<Link to="/">
				<img src="/images/logo/logo.png" alt="logo" />
			</Link>
		</div>
	);
};

export default Logo;
