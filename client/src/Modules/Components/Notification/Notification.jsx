/* eslint-disable react-hooks/exhaustive-deps */
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

	const [show, setShow] = useState(true);

	useEffect(() => {
		if (!show) setShow(true);

		if (time) {
			const timer = setTimeout(() => {
				setShow(false);
			}, time);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [option]);

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
