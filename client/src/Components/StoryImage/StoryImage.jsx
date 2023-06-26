import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Emoji from "Components/Emoji/Emoji";
import useCheckOutside from "Hooks/useCheckOutside";
import style from "./storyImage.module.scss";

const StoryImage = () => {
	const [showEmoji, setShowEmoji] = useState(false);
	const [value, setValue] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const emojiRef = useRef();

	useCheckOutside(emojiRef, () => setShowEmoji(false));

	window.onbeforeunload = () => {
		const currentURL = window.location.href;
		if (currentURL) return;
		localStorage.removeItem("storyType");
	};

	const handleChange = e => {
		const { value } = e.target;
		setValue(value);
	};

	const handleSetEmoji = icon => {
		setValue(prev => prev + icon);
	};

	const handleChangeImage = e => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = event => {
			setImagePreview(event.target.result);
		};
	};

	return (
		<div className={style.storyImage}>
			<div className={style.option}>
				<div className={style.action}>
					<div className={style.group}>
						<textarea
							type="text"
							value={value}
							onChange={handleChange}
							placeholder="Enter your content..."
						></textarea>
						<div ref={emojiRef} className={style.icons}>
							<span
								className={style.icon}
								onClick={() => setShowEmoji(!showEmoji)}
							>
								<BsEmojiSmile />
							</span>
							<div
								className={`${style.wrap} ${
									showEmoji ? style.show : ""
								}`}
							>
								<Emoji onSetEmoji={handleSetEmoji} />
							</div>
						</div>
					</div>
				</div>
				<div>
					<button className={style.up}>Up Story</button>
				</div>
			</div>

			<div className={style.preview}>
				<div className={style.wrapper}>
					<p className={style.title}>Preview</p>
					<div className={style.content}>
						{imagePreview ? (
							<div className={style.image}>
								<img src={imagePreview} alt="preview" />
							</div>
						) : (
							<div className={style.group}>
								<label htmlFor="image">
									<p className={style.icon}>
										<AiOutlineCloudUpload />
									</p>
									<p className={style.desc}>
										Choose a file or drag it here
									</p>
								</label>
								<input
									style={{ display: "none" }}
									id="image"
									type="file"
									accept="image/*"
									onChange={handleChangeImage}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryImage;
