import React, { useEffect } from "react";
import {
	AiFillCheckCircle,
	AiFillCloseCircle,
	AiFillInfoCircle,
	AiFillQuestionCircle,
	AiFillWarning
} from "react-icons/ai";
import style from "./notification.module.scss";

const Notification = ({ option, onClose, onConfirm, onCloseModal }) => {
	const { open, confirm, icon, message } = option;

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	const handleConfirm = () => {
		onConfirm();
	};

	const handleClose = () => {
		onCloseModal();
	};

	const icons = {
		success: <AiFillCheckCircle />,
		warning: <AiFillWarning />,
		error: <AiFillCloseCircle />,
		info: <AiFillInfoCircle />,
		question: <AiFillQuestionCircle />
	};

	return (
		<div className={style.notification}>
			{confirm && (
				<div className={style.modal}>
					<div className={style.box}>
						<p>hihi</p>
						<button onClick={handleConfirm}>Yes</button>
						<button onClick={handleClose}>No</button>
					</div>
					<div className={style.overlay} onClick={handleClose}></div>
				</div>
			)}
			{open && (
				<div className={style.alert}>
					<div className={style[icon]}>{icons[icon]}</div>
					<div>{message}</div>
				</div>
			)}
		</div>
	);
};

export default Notification;
