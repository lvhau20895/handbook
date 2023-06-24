import React from "react";
import style from "./storyImage.module.scss";

const StoryImage = () => {
	return (
		<div className={style.storyImage}>
			<div className={style.option}>
				<div className={style.action}>
					<div className={style.main}>
						<div className={style.group}>
							<textarea
								type="text"
								placeholder="Enter your content..."
							></textarea>
						</div>
						<button className={style.up}>Up Story</button>
					</div>
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
