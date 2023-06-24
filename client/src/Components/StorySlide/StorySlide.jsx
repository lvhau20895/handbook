import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import StoryModal from "Components/StoryModal";
import { Link } from "react-router-dom";
import style from "./storySlide.module.scss";

const StorySlide = () => {
	const [showPrev, setShowPrev] = useState(false);
	const [showNext, setShowNext] = useState(true);
	const [showVideo, setShowVideo] = useState(false);
	const [currentVideo, setCurrentVideo] = useState(null);

	const { user } = useSelector(state => state.user);
	const { profile } = user;

	const mainRef = useRef();

	const videos = [
		{
			src: "/videos/video1.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video2.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video3.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video4.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video5.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video6.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video7.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		},
		{
			src: "/videos/video8.mp4",
			name: "demo",
			avatar: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
		}
	];

	useEffect(() => {
		const main = mainRef.current;
		const handleScroll = () => {
			main.scrollLeft > 0 ? setShowPrev(true) : setShowPrev(false);
			Math.ceil(main.scrollLeft) >= main.scrollWidth - main.clientWidth
				? setShowNext(false)
				: setShowNext(true);
		};
		main.addEventListener("scroll", handleScroll);

		return () => {
			main.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleSlide = direction => {
		const main = mainRef.current;
		const viewSlide = main.offsetWidth / 5;
		main.scrollLeft += direction === "prev" ? -viewSlide : viewSlide;
	};

	const handleShowModal = i => {
		setCurrentVideo(i);
		setShowVideo(true);
	};

	const handleCloseModal = () => {
		setShowVideo(false);
		setCurrentVideo(null);
	};

	return (
		<div className={style.story}>
			<button
				style={{ display: showPrev ? "flex" : "none" }}
				className={`${style.navigation} ${style.prev}`}
				onClick={() => handleSlide("prev")}
			>
				<FaChevronLeft />
			</button>

			<div ref={mainRef} className={style.list}>
				<div className={style.wrap}>
					<Link to="/stories" className={style.add}>
						<div className={style.image}>
							<img
								style={{
									objectFit: profile?.avatar
										? "cover"
										: "contain"
								}}
								src={
									profile?.avatar
										? profile.avatar
										: "/images/avatar/default.png"
								}
								alt="avatar"
							/>
							<span className={style.icon}>
								<MdAdd />
							</span>
						</div>
						<p className={style.desc}>Add story</p>
					</Link>
				</div>

				{videos.map((video, i) => {
					return (
						<div key={i} className={style.wrap}>
							<div
								className={style.video}
								onClick={() => handleShowModal(i)}
							>
								<div className={style.avatar}>
									<img src={video.avatar} alt="avatar" />
								</div>
								<video src={video.src}></video>
								<p className={style.name}>{video.name}</p>
							</div>
						</div>
					);
				})}
			</div>

			<button
				style={{ display: showNext ? "flex" : "none" }}
				className={`${style.navigation} ${style.next}`}
				onClick={() => handleSlide("next")}
			>
				<FaChevronRight />
			</button>

			<StoryModal
				open={showVideo}
				videos={videos}
				current={currentVideo}
				onClose={handleCloseModal}
			/>
		</div>
	);
};

export default StorySlide;
