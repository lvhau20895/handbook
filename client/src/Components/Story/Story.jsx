import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper";
import { IoClose } from "react-icons/io5";
import style from "./story.module.scss";

const Story = () => {
	const [playingIndex, setPlayingIndex] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const videoRefs = useRef([]);

	const videos = [
		{ src: "/videos/video1.mp4" },
		{ src: "/videos/video2.mp4" },
		{ src: "/videos/video3.mp4" },
		{ src: "/videos/video4.mp4" },
		{ src: "/videos/video5.mp4" },
		{ src: "/videos/video6.mp4" },
		{ src: "/videos/video7.mp4" }
	];

	const handlePlayVideo = index => {
		setShowModal(true);
		setPlayingIndex(index);
	};

	const handlePauseVideo = index => {
		const video = videoRefs.current[index];
		if (playingIndex === index) {
			video.pause();
			setPlayingIndex(null);
		} else {
			video.play();
			setPlayingIndex(index);
		}
	};

	return (
		<div className={style.story}>
			<Swiper
				slidesPerView={5}
				spaceBetween={5}
				grid={{ rows: 1 }}
				navigation={true}
				modules={[Grid, Navigation]}
			>
				{videos.map((video, index) => {
					return (
						<SwiperSlide key={index} className={style.item}>
							<video
								src={video.src}
								onClick={() => handlePlayVideo(index)}
							></video>
						</SwiperSlide>
					);
				})}
			</Swiper>

			{showModal && (
				<div className={style.modal}>
					<span
						className={style.close}
						onClick={() => setShowModal(false)}
					>
						<IoClose />
					</span>
					<Swiper
						initialSlide={playingIndex}
						slidesPerView={1}
						navigation={true}
						modules={[Navigation]}
					>
						{videos.map((video, index) => {
							return (
								<SwiperSlide key={index}>
									<video
										ref={el =>
											(videoRefs.current[index] = el)
										}
										src={video.src}
										autoPlay={
											index === playingIndex
												? true
												: false
										}
										onClick={() => handlePauseVideo(index)}
									></video>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			)}
			{showModal && (
				<div
					className={style.overlay}
					onClick={() => setShowModal(false)}
				></div>
			)}
		</div>
	);
};

export default Story;
