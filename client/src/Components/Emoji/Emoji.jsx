import React, { useEffect, useState } from "react";
import style from "./emoji.module.scss";

const icons = {
	emoji: [
		"🙂",
		"😀",
		"😄",
		"😆",
		"😅",
		"😂",
		"🤣",
		"😊",
		"😌",
		"😉",
		"😏",
		"😍",
		"😘",
		"😗",
		"😙",
		"😚",
		"🤗",
		"😳",
		"🙃",
		"😇",
		"😛",
		"😝",
		"😜",
		"😋",
		"🤤",
		"🤓",
		"😎",
		"🤑",
		"😒",
		"🙁",
		"☹️",
		"😞",
		"😔",
		"😖",
		"😓",
		"🥹",
		"😢",
		"😭",
		"😟",
		"😣",
		"😩",
		"😫",
		"😕",
		"🤔",
		"🙄",
		"😤",
		"😠",
		"😡",
		"😶",
		"🤐",
		"😐",
		"😑",
		"😯",
		"😲",
		"😧",
		"😨",
		"😰",
		"😱",
		"😪",
		"😴",
		"😬",
		"🤥",
		"🤧",
		"🤒",
		"😷",
		"🤕",
		"😵",
		"🤠",
		"🤢",
		"😈",
		"🤡",
		"👺",
		"👻",
		"💀",
		"👽",
		"🤖",
		"🎃",
		"💩"
	],
	gesture: [
		"👍",
		"👎",
		"✌️",
		"🤞",
		"👌",
		"🤙",
		"🤘",
		"🖕",
		"☝️",
		"👉",
		"👈",
		"👇",
		"👆",
		"👊",
		"✊",
		"🤜",
		"🤛",
		"💪",
		"✍️",
		"🙏",
		"👏",
		"🤝",
		"👋",
		"🖐️",
		"👀"
	],
	other: [
		"❤️",
		"💔",
		"🎉️",
		"🎶️",
		"👑️",
		"🛒",
		"🐤",
		"🌻",
		"🌹",
		"🍀",
		"🌧️",
		"🐧"
	]
};

const Emoji = () => {
	const [iconList, setIconList] = useState(icons.emoji);
	const [active, setActive] = useState(1);

	const { emoji, gesture, other } = icons;
	const represent = [emoji[0], gesture[0], other[0]];

	const handleClick = (typeEmoji, index) => {
		setIconList(typeEmoji);
		setActive(index);
	};

	return (
		<div className={style.emoji}>
			<div className={style.represent}>
				<button
					className={`${active === 1 ? style.active : ""}`}
					onClick={() => handleClick(icons.emoji, 1)}
				>
					{icons.emoji[0]}
				</button>
				<button
					className={`${active === 2 ? style.active : ""}`}
					onClick={() => handleClick(icons.gesture, 2)}
				>
					{icons.gesture[0]}
				</button>
				<button
					className={`${active === 3 ? style.active : ""}`}
					onClick={() => handleClick(icons.other, 3)}
				>
					{icons.other[0]}
				</button>
			</div>

			<hr className={style.line} />

			<div className={style.list}>
				{iconList.map((icon, i) => {
					return (
						<button key={i} className={style.item}>
							{icon}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Emoji;
