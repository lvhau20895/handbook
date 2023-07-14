import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Emoji from "Components/Emoji";
import Publish from "Components/Publish/Publish";
import colorful from "../../Assets/Data/colorful.json";
import Switch from "Components/Switch/Switch";
import style from "./storyText.module.scss";

const StoryText = () => {
	const [content, setContent] = useState("");
	const [color, setColor] = useState("white");
	const [background, setBackground] = useState("black");
	const [theme, setTheme] = useState(4);
	const [switchMode, setSwitchMode] = useState(false);
	const [readMore, setReadMore] = useState(false);
	const [readMoreClicked, setReadMoreClicked] = useState(false);

	const containerRef = useRef();
	const textRef = useRef();
	const textareaRef = useRef();

	const { colors, backgrounds, themes } = colorful;

	useEffect(() => {
		const text = textRef.current;
		const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
		text.style.textAlign = `${
			text.clientHeight > lineHeight * 5 ? "left" : "center"
		}`;
		console.log(getComputedStyle(text).webkitLineClamp);

		if (content.length < 150) {
			setReadMoreClicked(false);
		}

		if (!readMoreClicked) {
			setReadMore(content.length > 150);
		}
	}, [content, readMoreClicked]);

	const handleScrollView = () => {
		textRef.current.scrollTop = textRef.current.clientHeight;
	};

	const handleChangeContent = e => {
		const { value } = e.target;

		setContent(value);
		handleScrollView();
	};

	const handleSetEmoji = emoji => {
		const textarea = textareaRef.current;
		const selectionStart = textarea.selectionStart;
		const selectionEnd = textarea.selectionEnd;
		const newValue =
			content.substring(0, selectionStart) +
			emoji +
			content.substring(selectionEnd);
		const newSelectionStart = selectionStart + emoji.length;
		const focusTextarea = () => {
			textarea.setSelectionRange(newSelectionStart, newSelectionStart);
			textarea.focus();
		};
		setTimeout(focusTextarea, 0);
		setContent(newValue);
	};

	const handleReadMore = () => {
		setReadMoreClicked(true);
		setReadMore(!readMore);
	};

	const handleUpStory = () => {};

	return (
		<div className={style.storyText}>
			<div className={style.option}>
				<div className={style.head}>
					<Link to="/stories" className={style.back}>
						<FaChevronLeft />
					</Link>

					<Publish />
				</div>

				<div className={style.group}>
					<textarea
						ref={textareaRef}
						spellCheck={false}
						placeholder="Enter your content..."
						value={content}
						onChange={handleChangeContent}
					></textarea>
					<div className={style.emoji}>
						<Emoji
							position={{
								top: "calc(100% + 15px)",
								right: "-10px"
							}}
							onEmoji={handleSetEmoji}
						/>
					</div>
				</div>

				<div className={style.color}>
					<p className={style.title}>Text color</p>
					<div className={style.wrap}>
						{colors.map((clr, i) => {
							return (
								<button
									key={i}
									style={{ background: clr }}
									className={`${
										clr === color ? style.active : ""
									}`}
									onClick={() => setColor(clr)}
								></button>
							);
						})}
					</div>
				</div>

				<div className={style.background}>
					<div className={style.title}>
						<p>Background content</p>
						<Switch
							isChecked={false}
							onSwitch={value => setSwitchMode(value)}
						/>
					</div>

					<div
						className={`${style.wrap} ${style.bg} ${
							switchMode ? style.show : ""
						}`}
					>
						{backgrounds.map((bg, i) => {
							return (
								<button
									key={i}
									style={{ background: bg }}
									className={`${
										bg === background ? style.active : ""
									}`}
									onClick={() => setBackground(bg)}
									disabled={!switchMode}
								></button>
							);
						})}
					</div>
				</div>

				<div className={style.theme}>
					<p className={style.title}>Background</p>
					<div className={style.box}>
						{themes.map((th, i) => {
							return (
								<img
									key={i}
									src={th.url}
									alt={th.name}
									className={`${
										i === theme ? style.active : ""
									}`}
									onClick={() => setTheme(i)}
								/>
							);
						})}
					</div>
				</div>

				<button className={style.up} onClick={handleUpStory}>
					Up Story
				</button>
			</div>

			<div className={style.preview}>
				<div className={style.content}>
					<p className={style.title}>Preview</p>
					<div className={style.screen}>
						<div ref={containerRef} className={style.view}>
							<img src={themes[theme].url} alt="theme" />

							<div className={style.box}>
								<p
									ref={textRef}
									style={{
										background: switchMode
											? background
											: "transparent",
										color,
										padding: content ? "10px" : 0
									}}
									className={style.text}
								>
									{readMore
										? content.substring(0, 150) + "..."
										: content}
								</p>

								{content.length > 150 && (
									<button
										className={style.more}
										onClick={handleReadMore}
									>
										{readMore ? "Read more" : "Hide"}
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryText;
