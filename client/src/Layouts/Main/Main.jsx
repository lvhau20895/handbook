import React, { useEffect } from "react";
import Header from "Components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "Slices/userSlice";
import style from "./main.module.scss";

const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	return (
		<div className={style.main}>
			<div className={style.header}>
				<Header />
			</div>

			<div className={style.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
