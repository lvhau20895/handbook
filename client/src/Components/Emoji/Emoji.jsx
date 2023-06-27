import React, { useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdCategory, MdEmojiPeople } from "react-icons/md";
import icons from "../../Assets/Data/icon.json";
import style from "./emoji.module.scss";

const Emoji = ({ onSetEmoji }) => {
	const [iconList, setIconList] = useState(icons.emoji);
	const [active, setActive] = useState(0);

	const represent = [
		{ icon: <BsFillEmojiSmileFill />, type: "emoji" },
		{ icon: <MdEmojiPeople />, type: "gesture" },
		{ icon: <MdCategory />, type: "other" }
	];

	const handleClick = (typeEmoji, index) => {
		setIconList(typeEmoji);
		setActive(index);
	};

	const handleSetEmoji = icon => {
		onSetEmoji(icon);
	};

	return (
		<div className={style.emoji}>
			<div className={style.represent}>
				{represent.map((item, i) => {
					return (
						<button
							key={i}
							onClick={() => handleClick(icons[item.type], i)}
						>
							{item.icon}
						</button>
					);
				})}
				<div
					style={{ left: `calc(${active} * 35px)` }}
					className={style.active}
				></div>
			</div>

			<hr className={style.line} />

			<div className={style.list}>
				{iconList.map((icon, i) => {
					return (
						<button
							key={i}
							className={style.item}
							onClick={() => handleSetEmoji(icon)}
						>
							{icon}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Emoji;
