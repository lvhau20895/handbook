import React, { useEffect, useState } from "react";
import {
	AiFillCheckCircle,
	AiFillCloseCircle,
	AiFillInfoCircle,
	AiFillQuestionCircle,
	AiFillWarning
} from "react-icons/ai";
import style from "./notification.module.scss";

const Notification = ({ option }) => {
	const { icon, message, time } = option;

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (Object.keys(option).length >= 1) setShow(true);

		if (time) {
			const timer = setTimeout(() => {
				setShow(false);
			}, time);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [option, time]);

	const icons = {
		success: <AiFillCheckCircle />,
		warning: <AiFillWarning />,
		error: <AiFillCloseCircle />,
		info: <AiFillInfoCircle />,
		question: <AiFillQuestionCircle />
	};
	return (
		<div className={`${style.notification} ${show && style.animate}`}>
			<div className={`${style.icon} ${style[icon]}`}>{icons[icon]}</div>
			<div className={style.message}>{message}</div>
		</div>
	);
};

export default Notification;
