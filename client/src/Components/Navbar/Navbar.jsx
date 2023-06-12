import React from "react";
import Theme from "Components/Theme";
import { BiMessageRounded } from "react-icons/bi";
import Bell from "Components/Bell";
import User from "Components/User";
import style from "./navbar.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";

const Navbar = () => {
	return (
		<div className={style.navbar}>
			<button className={style.item}>
				<AiOutlineUserAdd />
			</button>

			<button className={style.item}>
				<BiMessageRounded />
			</button>

			<button className={style.item}>
				<Bell />
			</button>

			<div className={style.user}>
				<User />
			</div>

			<Theme />
		</div>
	);
};

export default Navbar;
