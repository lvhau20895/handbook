import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./story.module.scss";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";

const Story = () => {
	const [hidePrev, setHidePrev] = useState(true);
	const [hideNext, setHideNext] = useState(false);

	const { user } = useSelector(state => state.user);
	console.log(user);

	const mainRef = useRef();
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

	useEffect(() => {
		const main = mainRef.current;
		const handleScroll = () => {
			main.scrollLeft > 0 ? setHidePrev(false) : setHidePrev(true);
			Math.ceil(main.scrollLeft) >= main.scrollWidth - main.clientWidth
				? setHideNext(true)
				: setHideNext(false);
		};
		main.addEventListener("scroll", handleScroll);

		return () => {
			main.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleSlide = direction => {
		const main = mainRef.current;
		const viewSlide = videoRefs.current[0].offsetWidth;
		main.scrollLeft += direction === "prev" ? -viewSlide : viewSlide;
	};

	return (
		<div className={style.story}>
			<button
				style={{ display: hidePrev ? "none" : "flex" }}
				className={`${style.navigation} ${style.prev}`}
				onClick={() => handleSlide("prev")}
			>
				<FaChevronLeft />
			</button>

			<div ref={mainRef} className={style.list}>
				<div className={`${style.wrap} ${style.add}`}>
					<img src="" alt="" />
					<span>
						<MdAdd />
					</span>
					<p className={style.desc}>Add story</p>
				</div>

				{videos.map((video, i) => {
					return (
						<div
							ref={el => (videoRefs.current[i] = el)}
							key={i}
							className={style.wrap}
						>
							<div className={style.video}>
								<video src={video.src}></video>
							</div>
						</div>
					);
				})}
			</div>

			<button
				style={{ display: hideNext ? "none" : "flex" }}
				className={`${style.navigation} ${style.next}`}
				onClick={() => handleSlide("next")}
			>
				<FaChevronRight />
			</button>
		</div>
	);
};

export default Story;
