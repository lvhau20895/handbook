import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	FcCollaboration,
	FcConferenceCall,
	FcNews,
	FcShop,
	FcSms,
	FcStart,
	FcTemplate,
	FcVoicePresentation
} from "react-icons/fc";
import style from "./category.module.scss";

const Category = () => {
	const [hovered, setHovered] = useState(null);

	const category = [
		{ icon: <FcNews />, name: "News Feed" },
		{ icon: <FcCollaboration />, name: "Friends" },
		{ icon: <FcConferenceCall />, name: "Groups" },
		{ icon: <FcTemplate />, name: "Pages" },
		{ icon: <FcShop />, name: "Marketplace" },
		{ icon: <FcStart />, name: "Watch" },
		{ icon: <FcSms />, name: "Messenger" },
		{ icon: <FcVoicePresentation />, name: "Report" }
	];

	const handleHover = () => {};

	return (
		<div className={style.category}>
			<div className={style.menu}>
				{category.map((item, index) => {
					return (
						<Link
							key={index}
							className={style.link}
							onMouseEnter={() => handleHover(index)}
							onMouseLeave={() => setHovered(null)}
						>
							<p className={style.icon}>{item.icon}</p>
							<p className={style.name}>{item.name}</p>
						</Link>
					);
				})}

				<div className={style.animate}></div>
			</div>
		</div>
	);
};

export default Category;
