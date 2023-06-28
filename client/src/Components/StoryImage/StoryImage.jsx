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
	const [background, setBackground] = useState("white");
	const [color, setColor] = useState("black");
	const [contentPosition, setContentPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);

	const emojiRef = useRef();
	const containerRef = useRef();
	const boxRef = useRef();

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

	const handleContentMouseDown = event => {
		setIsDragging(true);
		const offsetX = event.clientX - contentPosition.x;
		const offsetY = event.clientY - contentPosition.y;
		setContentPosition({ x: offsetX, y: offsetY });
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

									<p
										style={{
											background,
											color
										}}
										className={`${style.text} ${
											value ? style.show : ""
										}`}
										onMouseDown={handleContentMouseDown}
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

// import React, { useEffect, useRef } from "react";
// import "./styles.css";

// function App() {
//   const containerRef = useRef(null);
//   const boxRef = useRef(null);

//   const isClicked = useRef(false);

//   const coords = useRef({
//     startX: 0,
//     startY: 0,
//     lastX: 0,
//     lastY: 0
//   });

//   useEffect(() => {
//     if (!boxRef.current || !containerRef.current) return;

//     const box = boxRef.current;
//     const container = containerRef.current;

//     const onMouseDown = (e) => {
//       isClicked.current = true;
//       coords.current.startX = e.clientX;
//       coords.current.startY = e.clientY;
//     };

//     const onMouseUp = (e) => {
//       isClicked.current = false;
//       coords.current.lastX = box.offsetLeft;
//       coords.current.lastY = box.offsetTop;
//     };

//     const onMouseMove = (e) => {
//       if (!isClicked.current) return;

//       const nextX = e.clientX - coords.current.startX + coords.current.lastX;
//       const nextY = e.clientY - coords.current.startY + coords.current.lastY;

//       const boxWidth = box.offsetWidth;
//       const boxHeight = box.offsetHeight;
//       const containerWidth = container.offsetWidth;
//       const containerHeight = container.offsetHeight;

//       const minX = 0;
//       const maxX = containerWidth - boxWidth;
//       const minY = 0;
//       const maxY = containerHeight - boxHeight;

//       const constrainedX = Math.max(minX, Math.min(nextX, maxX));
//       const constrainedY = Math.max(minY, Math.min(nextY, maxY));

//       box.style.top = `${constrainedY}px`;
//       box.style.left = `${constrainedX}px`;
//     };

//     document.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);
//     document.addEventListener("mousemove", onMouseMove);

//     const cleanup = () => {
//       document.removeEventListener("mousedown", onMouseDown);
//       document.removeEventListener("mouseup", onMouseUp);
//       document.removeEventListener("mousemove", onMouseMove);
//     };

//     return cleanup;
//   }, []);

//   return (
//     <main>
//       <div ref={containerRef} className="container">
//         <div ref={boxRef} className="box"></div>
//       </div>
//     </main>
//   );
// }

// export default App;
