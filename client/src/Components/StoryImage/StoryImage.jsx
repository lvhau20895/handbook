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
import Notification from "Components/Notification";
import Publish from "Components/Publish";
import html2canvas from "html2canvas";
import style from "./storyImage.module.scss";

const StoryImage = () => {
	const [showEmoji, setShowEmoji] = useState(false);
	const [content, setContent] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [rotateImage, setRotateImage] = useState(0);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [background, setBackground] = useState("white");
	const [color, setColor] = useState("black");
	const [notification, setNotification] = useState({});

	const emojiRef = useRef();
	const containerRef = useRef();
	const imageRef = useRef();
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

		const boxRect = box.getBoundingClientRect();
		const boxWidth = boxRect.width;
		const boxHeight = boxRect.height;

		const initialX = Math.round((containerWidth - boxWidth) / 2);
		const initialY = Math.round((containerHeight - boxHeight) / 2);

		box.style.left = `${initialX}px`;
		box.style.top = `${initialY}px`;

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

		const onMouseMove = e => {
			if (!isClicked.current) return;
			const { startX, startY, lastX, lastY } = coords.current;

			const moveX = e.clientX - startX + lastX;
			const moveY = e.clientY - startY + lastY;

			const maxX = containerWidth - boxWidth;
			const maxY = containerHeight - boxHeight;

			const constrainedX = Math.max(0, Math.min(moveX, maxX));
			const constrainedY = Math.max(0, Math.min(moveY, maxY));

			box.style.left = `${constrainedX}px`;
			box.style.top = `${constrainedY}px`;
		};

		const onMouseUp = () => {
			isClicked.current = false;
			box.style.transition = "all 0.1s linear";
		};

		box.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			box.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [content]);

	useCheckOutside(emojiRef, () => setShowEmoji(false));

	const handleChangeContent = e => {
		const { value } = e.target;
		if (value.length > 250) {
			setNotification({
				icon: "warning",
				message: "content up to 200 characters",
				time: 2000
			});
			return;
		}
		setContent(value);
	};

	const handleSetEmoji = icon => {
		setContent(prev => prev + icon);
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
		setContent("");
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

	const handleRange = e => {
		const value = e.target.value;
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
	const handleSave = async () => {
		const canvas = await html2canvas(containerRef.current);
		console.log(canvas.toDataURL("image/jpeg"));
	};

	return (
		<div className={style.storyImage}>
			<Notification option={notification} />
			<div className={style.option}>
				<div className={style.action}>
					<div className={style.head}>
						<Link to="/stories" className={style.back}>
							<FaChevronLeft />
						</Link>

						<Publish />
					</div>

					{imagePreview && (
						<>
							<div className={style.group}>
								<textarea
									placeholder="Enter your content..."
									value={content}
									onChange={handleChangeContent}
								></textarea>
								<div ref={emojiRef} className={style.emoji}>
									<Emoji />
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
												onClick={() =>
													setBackground(bg)
												}
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
													clr === color
														? style.active
														: ""
												}`}
												onClick={() => setColor(clr)}
											></span>
										);
									})}
								</div>
							</div>
						</>
					)}
				</div>

				<button className={style.up} onClick={handleSave}>
					Up Story
				</button>
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
											ref={imageRef}
											style={{
												transform: `rotate(${rotateImage}deg)`
											}}
											src={imagePreview}
											alt="preview"
											draggable={false}
										/>
									</div>

									<p
										ref={boxRef}
										style={{
											background,
											color
										}}
										className={`${style.text} ${
											content ? style.show : ""
										}`}
									>
										{content}
									</p>

									<div className={style.setting}>
										<label htmlFor="image">
											<AiOutlineSwap />
										</label>

										<label onClick={handleRotateImage}>
											<AiOutlineRotateRight />
										</label>
									</div>

									<div className={style.range}>
										<div className={style.zoom}>
											<input
												type="range"
												min="0.5"
												max="1.5"
												step="0.01"
												value={zoomLevel}
												onInput={handleRange}
											/>
											<span className={style.result}>
												{zoomLevel}
											</span>
										</div>
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
