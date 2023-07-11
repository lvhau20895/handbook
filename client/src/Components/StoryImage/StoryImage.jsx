import React, { useRef, useState } from "react";
import {
	AiOutlineCloudUpload,
	AiOutlineRotateRight,
	AiOutlineSwap
} from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Emoji from "Components/Emoji/Emoji";
import Notification from "Components/Notification";
import Publish from "Components/Publish";
import html2canvas from "html2canvas";
import useDraggableBox from "Hooks/useDraggableBox";
import colorful from "../../Assets/Data/colorful.json";
import style from "./storyImage.module.scss";

const StoryImage = () => {
	const [content, setContent] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [rotateImage, setRotateImage] = useState(0);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [background, setBackground] = useState("white");
	const [color, setColor] = useState("black");
	const [notification, setNotification] = useState({});
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const containerRef = useRef();
	const imageRef = useRef();
	const boxRef = useRef();

	useDraggableBox(containerRef, boxRef, content, (x, y) =>
		setPosition({ x, y })
	);

	console.log(position);

	const { colors, backgrounds } = colorful;

	const reader = file => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = event => {
			setImagePreview(event.target.result);
		};
		setZoomLevel(1);
	};

	const handleDragPicture = e => {
		e.preventDefault();
	};

	const handleDropPicture = e => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		reader(file);
	};

	const handleRotateImage = () => {
		setRotateImage(prev => prev + 90);
	};

	const handleChangeImage = e => {
		setContent("");
		const file = e.target.files[0];
		reader(file);
	};

	const handleRange = e => {
		const value = e.target.value;
		setZoomLevel(value);
	};

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
								<p className={style.title}>Text</p>
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
					<div id="view" className={style.view}>
						{imagePreview ? (
							<div ref={containerRef} className={style.wrap}>
								<div
									style={{
										height: `calc(150px * ${
											window.innerHeight - 170
										} / 380)`
									}}
									className={style.test}
								>
									<img
										className={style.demo}
										src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/hinh-anh-chill-dep.jpg"
										alt=""
									/>
								</div>
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
								onDragOver={handleDragPicture}
								onDrop={handleDropPicture}
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
