import React from "react";
import style from "./story.module.scss";

const Story = () => {
	const videos = [
		{ src: "/videos/video1.mp4" },
		{ src: "/videos/video2.mp4" },
		{ src: "/videos/video3.mp4" },
		{ src: "/videos/video4.mp4" },
		{ src: "/videos/video5.mp4" },
		{ src: "/videos/video6.mp4" },
		{ src: "/videos/video7.mp4" }
	];
	return (
		<div className={style.story}>
			<div className={style.list}>
				<button className={`${style.navigation} ${style.prev}`}>
					Prev
				</button>

				{videos.map((video, i) => {
					return (
						<div key={i} className={style.video}>
							<div className={style.wrap}>
								<video src={video.src}></video>
							</div>
						</div>
					);
				})}

				<button className={`${style.navigation} ${style.next}`}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Story;
