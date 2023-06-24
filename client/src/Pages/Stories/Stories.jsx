import React from "react";
import style from "./stories.module.scss";
import { IoTextSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";

const Stories = () => {
	const types = [
		{
			icon: <IoTextSharp />,
			title: "Create text",
			type: "text"
		},
		{
			icon: <RiImageAddFill />,
			title: "Create image",
			type: "image"
		},
		{
			icon: <BiMoviePlay />,
			title: "Create video",
			type: "video"
		}
	];

	return (
		<div className={style.stories}>
			{/* <input type="file" accept="video/*" />
			<input type="file" accept="image/*" /> */}
			<div className={style.type}>
				{types.map((item, i) => {
					return (
						<div key={i} className={style.add}>
							<div
								className={`${style.content} ${
									style[item.type]
								}`}
							>
								<p className={style.icon}>{item.icon}</p>
								<p className={style.title}>{item.title}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Stories;
