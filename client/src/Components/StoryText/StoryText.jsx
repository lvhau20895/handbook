import React, { useRef, useState } from "react";
import style from "./storyText.module.scss";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Publish from "Components/Publish/Publish";
import { BsEmojiSmile } from "react-icons/bs";

const StoryText = () => {
	const [content, setContent] = useState("");
	const emojiRef = useRef();

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
						<div ref={emojiRef} className={style.emoji}>
							<button className={style.icon}>
								<BsEmojiSmile />
							</button>
							{/* <div
								className={`${style.icons} ${
									showEmoji ? style.show : ""
								}`}
							>
								<Emoji onSetEmoji={handleSetEmoji} />
							</div> */}
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
