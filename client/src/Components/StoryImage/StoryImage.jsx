import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import {
	AiOutlineCloudUpload,
	AiOutlineRotateRight,
	AiOutlineSwap
} from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Emoji from "Components/Emoji/Emoji";
import useCheckOutside from "Hooks/useCheckOutside";
import style from "./storyImage.module.scss";

const StoryImage = () => {
	const [showEmoji, setShowEmoji] = useState(false);
	const [value, setValue] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [rotateImage, setRotateImage] = useState(0);
	const [zoomLevel, setZoomLevel] = useState(1);

	const emojiRef = useRef();

	useCheckOutside(emojiRef, () => setShowEmoji(false));

	const handleChangeContent = e => {
		const { value } = e.target;
		setValue(value);
	};

	const handleSetEmoji = icon => {
		setValue(prev => prev + icon);
	};

	const reader = file => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = event => {
			setImagePreview(event.target.result);
		};
		setZoomLevel(1);
	};

	const handleChangeImage = e => {
		const file = e.target.files[0];
		reader(file);
	};

	const handleDrag = e => {
		e.preventDefault();
	};

	const handleDrop = e => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		reader(file);
	};

	const handleRotateImage = () => {
		setRotateImage(prev => prev + 90);
	};

	const handleZoom = e => {
		const value = parseFloat(e.target.value);
		setZoomLevel(value);
	};

	return (
		<div className={style.storyImage}>
			<div className={style.option}>
				<div className={style.action}>
					<Link to="/stories" className={style.back}>
						<FaChevronLeft />
					</Link>

					<div className={style.group}>
						<textarea
							placeholder="Enter your content..."
							value={value}
							onChange={handleChangeContent}
						></textarea>
						<div ref={emojiRef} className={style.emoji}>
							<span
								className={style.icon}
								onClick={() => setShowEmoji(!showEmoji)}
							>
								<BsEmojiSmile />
							</span>
							<div
								className={`${style.icons} ${
									showEmoji ? style.show : ""
								}`}
							>
								<Emoji onSetEmoji={handleSetEmoji} />
							</div>
						</div>
					</div>
				</div>

				<button className={style.up}>Up Story</button>
			</div>

			<div className={style.preview}>
				<div className={style.content}>
					<p className={style.title}>Preview</p>
					<div className={style.view}>
						{imagePreview ? (
							<div className={style.wrap}>
								<div className={style.picture}>
									<div
										style={{
											transform: `scale(${zoomLevel})`
										}}
										className={style.image}
									>
										<img
											style={{
												transform: `rotate(${rotateImage}deg)`
											}}
											src={imagePreview}
											alt="preview"
										/>
									</div>

									<div className={style.setting}>
										<label htmlFor="image">
											<AiOutlineSwap />
										</label>

										<label onClick={handleRotateImage}>
											<AiOutlineRotateRight />
										</label>
									</div>

									<div className={style.zoom}>
										<input
											type="range"
											min="0.5"
											max="1.5"
											step="0.01"
											value={zoomLevel}
											onInput={handleZoom}
										/>
										<span className={style.size}>
											{zoomLevel}
										</span>
									</div>
								</div>
							</div>
						) : (
							<div
								className={style.group}
								onDragOver={handleDrag}
								onDrop={handleDrop}
							>
								<label htmlFor="image">
									<p className={style.icon}>
										<AiOutlineCloudUpload />
									</p>
									<p className={style.desc}>
										Choose a file or darg it here
									</p>
								</label>
							</div>
						)}
						<input
							className={style.file}
							id="image"
							type="file"
							accept="image/*"
							onChange={handleChangeImage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryImage;
