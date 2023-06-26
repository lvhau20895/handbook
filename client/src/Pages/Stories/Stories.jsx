import React from "react";
import { IoTextSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "./stories.module.scss";

const Stories = () => {
	const types = [
		{
			url: "text",
			icon: <IoTextSharp />,
			title: "Create text",
			type: "text"
		},
		{
			url: "image",
			icon: <RiImageAddFill />,
			title: "Create image",
			type: "image"
		},
		{
			url: "video",
			icon: <BiMoviePlay />,
			title: "Create video",
			type: "video"
		}
	];

	return (
		<div className={style.stories}>
			<Link to="/" className={style.back}>
				<FaChevronLeft />
			</Link>

			{/* <input type="file" accept="video/*" />
			<input type="file" accept="image/*" /> */}
			<div className={style.type}>
				{types.map((item, i) => {
					return (
						<Link
							to={item.url}
							key={i}
							className={`${style.add} ${style[item.type]}`}
						>
							<p className={style.icon}>{item.icon}</p>
							<p className={style.title}>{item.title}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Stories;
