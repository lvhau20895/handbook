import React from "react";
import style from "./modalStory.module.scss";

const ModalStory = ({ open, videos, current, onClose }) => {
	return (
		<div className={style.modalStory}>
			<div
				className={`${style.overlay} ${open ? style.show : ""}`}
				onClick={onClose}
			></div>

			<div className={`${style.main} ${open ? style.show : ""}`}>
				<div className={style.videos}>
					{videos.map((video, i) => {
						return <video key={i} src={video.src}></video>;
					})}
				</div>
			</div>
		</div>
	);
};

export default ModalStory;
