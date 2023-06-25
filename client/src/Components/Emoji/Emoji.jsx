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
		"😢",
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
		"🎤",
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

	console.log(iconList);

	return (
		<div className={style.emoji}>
			<div className={style.represent}>
				<button onClick={() => setIconList(icons.emoji)}>
					{icons.emoji[0]}
				</button>
				<button onClick={() => setIconList(icons.gesture)}>
					{icons.gesture[0]}
				</button>
				<button onClick={() => setIconList(icons.other)}>
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
