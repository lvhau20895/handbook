import React, { useState } from "react";
import { IoTextSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import StoryText from "Components/StoryText";
import StoryImage from "Components/StoryImage";
import StoryVideo from "Components/StoryVideo";
import style from "./stories.module.scss";

const Stories = () => {
	const [type, setType] = useState("");

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

	console.log(type);

	return (
		<div
			style={{ display: !type ? "flex" : "unset" }}
			className={style.stories}
		>
			<div
				style={{ display: !type ? "none" : "flex" }}
				className={style.back}
				onClick={() => setType("")}
			>
				<FaChevronLeft />
			</div>
			{/* <input type="file" accept="video/*" />
			<input type="file" accept="image/*" /> */}
			<div
				style={{ display: type ? "none" : "flex" }}
				className={style.type}
			>
				{types.map((item, i) => {
					return (
						<div key={i} className={style.add}>
							<div
								className={`${style.content} ${
									style[item.type]
								}`}
								onClick={() => setType(item.type)}
							>
								<p className={style.icon}>{item.icon}</p>
								<p className={style.title}>{item.title}</p>
							</div>
						</div>
					);
				})}
			</div>

			{type === "text" && <StoryText />}
			{type === "image" && <StoryImage />}
			{type === "video" && <StoryVideo />}
		</div>
	);
};

export default Stories;
