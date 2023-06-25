import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import style from "./storyImage.module.scss";
import Emoji from "Components/Emoji/Emoji";

const StoryImage = () => {
	return (
		<div className={style.storyImage}>
			<div className={style.option}>
				<div className={style.action}>
					<div className={style.group}>
						<textarea
							type="text"
							placeholder="Enter your content..."
						></textarea>
						<span className={style.icon}>
							<BsEmojiSmile />
						</span>
					</div>
					<div className={style.icons}>
						<Emoji />
					</div>
				</div>
				<div>
					<button className={style.up}>Up Story</button>
				</div>
			</div>

			<div className={style.preview}>
				<div className={style.wrapper}>
					<p className={style.title}>Preview</p>
					<div className={style.content}></div>
				</div>
			</div>
		</div>
	);
};

export default StoryImage;
