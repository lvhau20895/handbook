import React, { useRef, useState } from "react";
import { BsEmojiSmile, BsFillEmojiSmileFill } from "react-icons/bs";
import { MdCategory, MdEmojiPeople } from "react-icons/md";
import icons from "../../Assets/Data/icon.json";
import style from "./emoji.module.scss";
import useCheckOutside from "Hooks/useCheckOutside";

const Emoji = ({ position, onEmoji }) => {
	const [showEmoji, setShowEmoji] = useState(false);
	const [iconList, setIconList] = useState(icons.emoji);
	const [active, setActive] = useState(0);

	const emojiRef = useRef();

	useCheckOutside(emojiRef, () => setShowEmoji(false));

	const represent = [
		{ icon: <BsFillEmojiSmileFill />, type: "emoji" },
		{ icon: <MdEmojiPeople />, type: "gesture" },
		{ icon: <MdCategory />, type: "other" }
	];

	const handleShowEmoji = e => {
		e.preventDefault();
		e.button === 0 && setShowEmoji(!showEmoji);
	};

	const handleClick = (typeEmoji, index) => {
		setIconList(typeEmoji);
		setActive(index);
	};

	return (
		<div ref={emojiRef} className={style.emoji}>
			<div className={style.action}>
				<BsEmojiSmile onMouseDown={e => handleShowEmoji(e)} />
			</div>

			<div
				style={position}
				className={`${style.box} ${showEmoji ? style.show : ""}`}
			>
				<div className={style.represent}>
					{represent.map((icon, i) => {
						return (
							<button
								key={i}
								onClick={() => handleClick(icons[icon.type], i)}
							>
								{icon.icon}
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
							<button key={i} onClick={() => onEmoji(icon)}>
								{icon}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Emoji;
