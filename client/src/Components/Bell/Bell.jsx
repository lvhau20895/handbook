import React from "react";
import { FiBell } from "react-icons/fi";
import style from "./bell.module.scss";

const Bell = () => {
	return (
		<>
			<FiBell />

			<div className={style.box}></div>
		</>
	);
};

export default Bell;
