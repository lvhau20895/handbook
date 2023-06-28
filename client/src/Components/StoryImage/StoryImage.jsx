import React, { useEffect, useRef, useState } from "react";
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
	const [background, setBackground] = useState("white");
	const [color, setColor] = useState("black");

	const emojiRef = useRef();
	const containerRef = useRef();
	const boxRef = useRef();
	const isClicked = useRef(false);
	const coords = useRef({
		startX: 0,
		startY: 0,
		lastX: 0,
		lastY: 0
	});

	useEffect(() => {
		if (!containerRef.current || !boxRef.current) return;

		const container = containerRef.current;
		const box = boxRef.current;

		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;
		const boxWidth = box.offsetWidth;
		const boxHeight = box.offsetHeight;

		if (!isClicked) {
			const initialX = (containerWidth - boxWidth) / 2;
			const initialY = (containerHeight - boxHeight) / 2;

			box.style.left = `${initialX}px`;
			box.style.top = `${initialY}px`;
		}

		const onMouseDown = e => {
			isClicked.current = true;
			coords.current = {
				startX: e.clientX,
				startY: e.clientY,
				lastX: box.offsetLeft,
				lastY: box.offsetTop
			};
			box.style.transition = "unset";
		};

		const onMouseUp = () => {
			isClicked.current = false;
			box.style.transition = "all 0.2s linear";
		};
		const onMouseMove = e => {
			if (!isClicked.current) return;
			const { startX, startY, lastX, lastY } = coords.current;

			const moveX = e.clientX - startX + lastX;
			const moveY = e.clientY - startY + lastY;

			const minX = 0;
			const minY = 0;
			const maxX = containerWidth - boxWidth;
			const maxY = containerHeight - boxHeight;

			const constrainedX = Math.max(minX, Math.min(moveX, maxX));
			const constrainedY = Math.max(minY, Math.min(moveY, maxY));

			box.style.left = `${constrainedX}px`;
			box.style.top = `${constrainedY}px`;
		};

		box.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);

		return () => {
			box.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, [value]);

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

	const backgrounds = ["white", "black"];
	const colors = [
		"white",
		"black",
		"brown",
		"red",
		"green",
		"darkblue",
		"darkcyan",
		"yellow",
		"violet",
		"pink"
	];

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

					<div className={style.background}>
						<p className={style.title}>Background</p>
						<div className={style.wrap}>
							{backgrounds.map((bg, i) => {
								return (
									<span
										key={i}
										style={{ background: bg }}
										className={`${
											bg === background
												? style.active
												: ""
										}`}
										onClick={() => setBackground(bg)}
									></span>
								);
							})}
						</div>
					</div>

					<div className={style.color}>
						<p className={style.title}>Color</p>
						<div className={style.wrap}>
							{colors.map((clr, i) => {
								return (
									<span
										key={i}
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
				</div>

				<button className={style.up}>Up Story</button>
			</div>

			<div className={style.preview}>
				<div className={style.content}>
					<p className={style.title}>Preview</p>
					<div className={style.view}>
						{imagePreview ? (
							<div ref={containerRef} className={style.wrap}>
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

									<p
										ref={boxRef}
										style={{
											background,
											color
										}}
										className={`${style.text} ${
											value ? style.show : ""
										}`}
									>
										{value}
									</p>

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
										Choose a file or drag it here
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
