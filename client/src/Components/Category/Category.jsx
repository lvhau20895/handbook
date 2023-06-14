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
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import style from "./category.module.scss";

const Category = () => {
	const [hovered, setHovered] = useState(null);
	const [viewMore, setViewMore] = useState(false);

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

	return (
		<div className={style.category}>
			<div className={style.menu}>
				{category
					.slice(0, viewMore ? category.length : 6)
					.map((item, index) => {
						return (
							<Link
								key={index}
								className={style.link}
								onMouseEnter={() => setHovered(index)}
								onMouseLeave={() => setHovered(null)}
							>
								<p className={style.icon}>{item.icon}</p>
								<p className={style.name}>{item.name}</p>
							</Link>
						);
					})}

				<div
					style={{
						height: `calc(100% / ${
							viewMore ? category.length : 6
						})`,
						top: `calc(100% / ${
							viewMore ? category.length : 6
						} * ${hovered})`
					}}
					className={`${style.animate} ${
						hovered !== null && style.show
					}`}
				></div>
			</div>

			<div className={style.more}>
				<button onClick={() => setViewMore(!viewMore)}>
					<p className={style.chevron}>
						{!viewMore ? <FaChevronDown /> : <FaChevronUp />}
					</p>
					<p className={style.text}>
						{!viewMore ? "View more" : "Hide"}
					</p>
				</button>
			</div>
		</div>
	);
};

export default Category;
