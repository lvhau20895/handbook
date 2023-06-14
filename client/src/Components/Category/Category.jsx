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
import { FaChevronUp } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import style from "./category.module.scss";

const Category = () => {
	const [hovered, setHovered] = useState(null);
	const [more, setMore] = useState(false);

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
				{category.slice(0, 6).map((item, index) => {
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
						height: more
							? `calc(45px * ${category.slice(6).length})`
							: 0
					}}
					className={`${style.extra} ${more ? style.show : ""}`}
				>
					{category.slice(6).map((item, index) => {
						return (
							<Link
								key={index}
								className={style.link}
								onMouseEnter={() => setHovered(index + 6)}
								onMouseLeave={() => setHovered(null)}
							>
								<p className={style.icon}>{item.icon}</p>
								<p className={style.name}>{item.name}</p>
							</Link>
						);
					})}
				</div>

				<div
					style={{
						height: `calc(100% / ${more ? category.length : 6})`,
						top: `calc(100% / ${
							more ? category.length : 6
						} * ${hovered})`
					}}
					className={`${style.animate} ${
						hovered !== null && style.show
					}`}
				></div>
			</div>

			<div className={style.more}>
				<button onClick={() => setMore(!more)}>
					<p className={style.chevron}>
						{more ? <FaChevronUp /> : <BiDotsHorizontalRounded />}
					</p>
					<p className={style.text}>{!more ? "More" : "Hide"}</p>
				</button>
			</div>
		</div>
	);
};

export default Category;
