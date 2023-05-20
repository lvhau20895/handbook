import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import theme from "./theme.module.scss";

const Theme = () => {
	const [checked, setChecked] = useState(
		JSON.parse(localStorage.getItem("mode")) || false
	);

	useEffect(() => {
		localStorage.setItem("mode", JSON.stringify(checked));

		if (checked) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
			return;
		}
		document.body.classList.add("light");
		document.body.classList.remove("dark");
	}, [checked]);

	const handleSwitchMode = () => {
		setChecked(!checked);
	};

	return (
		<div
			className={`${theme.switchMode} ${checked ? theme.active : ""}`}
			onClick={handleSwitchMode}
		>
			<span className={theme.icon}>
				{checked ? <BiMoon /> : <BiSun />}
			</span>
		</div>
	);
};

export default Theme;
