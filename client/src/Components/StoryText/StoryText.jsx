import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Emoji from "Components/Emoji";
import Publish from "Components/Publish/Publish";
import style from "./storyText.module.scss";

const StoryText = () => {
	const [content, setContent] = useState("");

	const handleChangeContent = e => {
		const { value } = e.target;
		setContent(value);
	};

	const handleUpStory = () => {};

	return (
		<div className={style.storyText}>
			<div className={style.option}>
				<div className={style.action}>
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
								onEmoji={icon =>
									setContent(prev => prev + icon)
								}
							/>
						</div>
					</div>
				</div>

				<button className={style.up} onClick={handleUpStory}>
					Up Story
				</button>
			</div>

			<div className={style.preview}>
				<div className={style.content}>
					<p className={style.title}>Preview</p>
					<div className={style.view}></div>
				</div>
			</div>
		</div>
	);
};

export default StoryText;
