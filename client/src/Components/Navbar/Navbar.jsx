import React, { useEffect } from "react";
import Theme from "Components/Theme";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import style from "./navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "Slices/userSlice";

const Navbar = () => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	console.log(user);
	useEffect(() => {
		dispatch(getUser());
	}, []);

	return (
		<div className={style.navbar}>
			<button className={style.item}>
				<AiOutlineUserAdd />
			</button>

			<button className={style.item}>
				<BiMessageRounded />
			</button>

			<button className={style.item}>
				<IoNotificationsOutline />
			</button>

			<Theme />
		</div>
	);
};

export default Navbar;
