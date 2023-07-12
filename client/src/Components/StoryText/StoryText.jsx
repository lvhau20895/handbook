import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Emoji from "Components/Emoji";
import Publish from "Components/Publish/Publish";
import colorful from "../../Assets/Data/colorful.json";
import Notification from "Components/Notification";
import Switch from "Components/Switch/Switch";
import style from "./storyText.module.scss";

const StoryText = () => {
	const [content, setContent] = useState("");
	const [notification, setNotification] = useState({});
	const [color, setColor] = useState("white");
	const [background, setBackground] = useState("black");
	const [theme, setTheme] = useState(4);
	const [switchMode, setSwitchMode] = useState(false);
	const [zoomLevel, setZoomLevel] = useState(1);

	const containerRef = useRef();
	const textRef = useRef();

	const { colors, backgrounds, themes } = colorful;

	useEffect(() => {
		const container = containerRef.current;
		const text = textRef.current;

		const containerHeight = container.offsetHeight;
		const textHeight = text.scrollHeight;
		const textMaxHeight = (containerHeight * 50) / 100;
		console.log(textHeight, textMaxHeight);
		if (textHeight >= textMaxHeight) {
			console.log("no no no");
		}
	}, [content]);

	const handleScrollView = () => {
		textRef.current.scrollTop = textRef.current.clientHeight;
	};

	const handleChangeContent = e => {
		const { value } = e.target;

		if (value.length > 500) {
			setNotification({
				icon: "warning",
				message: "content up to 500 characters",
				time: 2000
			});
			return;
		}
		setContent(value);
		// handleScrollView();
	};

	const handleRange = e => {
		const { value } = e.target;
		setZoomLevel(value);
	};

	const handleUpStory = () => {};

	return (
		<div className={style.storyText}>
			<Notification option={notification} />

			<div className={style.option}>
				<div className={style.head}>
					<Link to="/stories" className={style.back}>
						<FaChevronLeft />
					</Link>

					<Publish />
				</div>

				<div className={style.group}>
					<textarea
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
							onEmoji={icon => setContent(prev => prev + icon)}
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
							<div className={style.zoom}>
								<input
									type="range"
									min="0.5"
									max="1.5"
									step="0.1"
									value={zoomLevel}
									onInput={handleRange}
								/>
								<span className={style.result}>
									{zoomLevel}
								</span>
							</div>

							<img src={themes[theme].url} alt="theme" />

							<p
								ref={textRef}
								style={{
									background: switchMode
										? background
										: "transparent",
									color,
									padding: content ? "10px" : 0,
									fontSize: `${zoomLevel}em`
								}}
								className={style.text}
							>
								{content}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryText;
