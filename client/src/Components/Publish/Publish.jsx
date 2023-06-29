import React, { useState } from "react";
import style from "./publish.module.scss";
import { FaGlobeAmericas, FaUserEdit, FaUserFriends } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Publish = () => {
	const [open, setOpen] = useState(false);

	const options = [
		{
			type: "global",
			description: "Anyone can see this news",
			icon: <FaGlobeAmericas />
		},
		{
			type: "friend",
			description: "Only friends can see this news",
			icon: <FaUserFriends />
		},
		{
			type: "alone",
			description: "Only I can see this news",
			icon: <FaUserEdit />
		}
	];

	return (
		<div className={style.publish}>
			<div className={style.represent} onClick={() => setOpen(!open)}>
				<IoSettingsSharp />
			</div>

			<div className={`${style.modal} ${open ? style.show : ""}`}>
				<div className={style.overlay}></div>
				<div className={style.main}>
					{options.map((option, index) => {
						return (
							<div key={index} className={style.group}>
								<label htmlFor={option.type}>div</label>
								<input id={option.type} type="radio" />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Publish;
