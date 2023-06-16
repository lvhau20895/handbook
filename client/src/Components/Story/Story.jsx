import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper";
import style from "./story.module.scss";

const Story = () => {
	const [play, setPlay] = useState(false);
	const [indexVideo, setIndexVideo] = useState(null);

	const videoRef = useRef(null);

	const videos = [
		{ src: "/videos/video1.mp4" },
		{ src: "/videos/video2.mp4" },
		{ src: "/videos/video3.mp4" },
		{ src: "/videos/video4.mp4" },
		{ src: "/videos/video5.mp4" },
		{ src: "/videos/video6.mp4" },
		{ src: "/videos/video7.mp4" }
	];

	const handlePlayVideo = () => {
		console.log(videoRef.current);
		if (!play) {
			videoRef.current.play();
			setPlay(true);
		} else {
			videoRef.current.pause();
			setPlay(false);
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
								ref={videoRef}
								src={video.src}
								onClick={handlePlayVideo}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Story;
