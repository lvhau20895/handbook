import React, { useState } from "react";
import style from "./switch.module.scss";

const Switch = ({ isChecked, onSwitch }) => {
	const [mode, setMode] = useState(isChecked);

	const handleSwitch = () => {
		setMode(!mode);
		if (onSwitch) onSwitch(!mode);
	};

	return (
		<div
			className={`${style.switch} ${mode ? style.checked : ""}`}
			onClick={handleSwitch}
		>
			<span className={style.mode}></span>
		</div>
	);
};

export default Switch;
