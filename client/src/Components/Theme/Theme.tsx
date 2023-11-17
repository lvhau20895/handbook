import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import style from "./theme.module.scss";

const Theme = () => {
	const [checked, setChecked] = useState<boolean>(
		JSON.parse(localStorage.getItem("theme") || "false")
	);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(checked));

		if (checked) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
			return;
		}
		document.body.classList.add("light");
		document.body.classList.remove("dark");
	}, [checked]);

	return (
		<div
			className={`${style.switchMode} ${checked ? style.active : ""}`}
			onClick={() => setChecked(!checked)}
		>
			<span className={style.icon}>
				{checked ? <BiMoon /> : <BiSun />}
			</span>
		</div>
	);
};

export default Theme;
