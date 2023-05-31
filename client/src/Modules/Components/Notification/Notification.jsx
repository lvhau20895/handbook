import React, { useEffect } from "react";
import {
	AiFillCheckCircle,
	AiFillCloseCircle,
	AiFillInfoCircle,
	AiFillQuestionCircle,
	AiFillWarning
} from "react-icons/ai";
import style from "./notification.module.scss";

const Notification = ({ option, onClose, onConfirm, onCancel }) => {
	const { open, modal, type, content, icon, message } = option;

	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => {
				onClose();
			}, 2000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [open, onClose]);

	const handleConfirm = () => {
		onConfirm();
	};

	const handleCancel = () => {
		onCancel();
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
			{modal && (
				<div className={style.modal}>
					<div className={style.overlay} onClick={handleCancel}></div>
					<div className={style.box}>
						<p className={style.content}>{content}</p>
						<div className={style.action}>
							<button
								className={`${style.confirm} ${
									type && style[type]
								}`}
								onClick={handleConfirm}
							>
								Yes
							</button>
							<button
								className={style.cancel}
								onClick={handleCancel}
							>
								No
							</button>
						</div>
					</div>
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
