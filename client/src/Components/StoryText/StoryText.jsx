import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Emoji from "Components/Emoji";
import Publish from "Components/Publish/Publish";
import colorful from "../../Assets/Data/colorful.json";
import style from "./storyText.module.scss";

const StoryText = () => {
	const [content, setContent] = useState("");
	const [color, setColor] = useState("black");
	const [background, setBackground] = useState("white");
	const [theme, setTheme] = useState(0);

	const { colors, backgrounds, themes } = colorful;

	const handleChangeContent = e => {
		const { value } = e.target;
		setContent(value);
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
								<span
									style={{ background: clr }}
									className={`${
										clr === color ? style.active : ""
									}`}
									onClick={() => setColor(clr)}
								></span>
							);
						})}
					</div>
				</div>

				<div className={style.background}>
					<p className={style.title}>Background content</p>
					<div className={style.wrap}>
						{backgrounds.map((bg, i) => {
							return (
								<span
									style={{ background: bg }}
									className={`${
										bg === background ? style.active : ""
									}`}
									onClick={() => setBackground(bg)}
								></span>
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
						<div className={style.view}>
							<img src={themes[theme].url} alt="theme" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryText;
