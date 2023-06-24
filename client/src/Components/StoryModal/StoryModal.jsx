import React, { useEffect, useRef, useState } from "react";
import style from "./storyModal.module.scss";

const StoryModal = ({ open, videos, current, onClose }) => {
	const [time, setTime] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const listRef = useRef();
	const videoRefs = useRef([]);

	useEffect(() => {
		setCurrentIndex(current);
		const list = listRef.current;
		const video = videoRefs.current[current];

		const handleStoryCurrent = () => {
			const viewSlide = list.clientWidth;
			list.scrollTo(viewSlide * current, 0);

			if (video) video.play();
		};

		handleStoryCurrent();
	}, [current]);

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		const currentVideo = videoRefs.current[currentIndex];
	// 		const { currentTime, duration } = currentVideo;
	// 		const newTime = (currentTime / duration) * 100;
	// 		setTime(newTime);
	// 		console.log(newTime);
	// 		if (newTime >= 100) {
	// 			if (currentIndex === videoRefs.current.length - 1) {
	// 				clearInterval(timer);
	// 				setAdd(true);
	// 			} else {
	// 				handleClick("down");
	// 			}
	// 		}
	// 	}, 50);
	// 	return () => {
	// 		clearInterval(timer);
	// 	};
	// }, [currentIndex]);

	const handleScroll = e => {
		if (current === null) return;
		setTime(0);
		const list = listRef.current;
		const viewWidth = list.clientWidth;
		const scrollPosition = e.target.scrollLeft;
		const scrollIndex = Math.ceil(scrollPosition) / viewWidth;
		setCurrentIndex(scrollIndex);
		videoRefs.current.forEach((video, index) => {
			index === scrollIndex ? video.play() : video.pause();
			video.currentTime = 0;
		});
	};

	const handleClose = () => {
		const video = videoRefs.current[currentIndex];
		video.pause();
		video.currentTime = 0;
		onClose();
	};

	return (
		<div className={`${style.modalStory} ${open ? style.show : ""}`}>
			<div className={style.overlay} onClick={handleClose}></div>

			<div className={style.main}>
				<div
					ref={listRef}
					className={style.videos}
					onScroll={handleScroll}
				>
					{videos.map((video, i) => {
						return (
							<div key={i} className={style.item}>
								<div className={style.progress}>
									<span className={style.time}></span>
								</div>

								<video
									ref={el => (videoRefs.current[i] = el)}
									src={video.src}
								></video>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default StoryModal;
