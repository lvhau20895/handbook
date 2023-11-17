import { useState, useEffect } from "react";
import { AiFillCheckCircle, AiFillCloseCircle, AiFillWarning } from "react-icons/ai";
import { NotificationOptions, useNotificationContext } from "Contexts/NotificationProvider";
import style from "./notification.module.scss";

interface Icons {
	success?: JSX.Element;
	warning?: JSX.Element;
	error?: JSX.Element;
}

const Notification = () => {
	const [show, setShow] = useState<boolean>(false);

	const { notificationOptions } = useNotificationContext();

	const { icon, message, time } = notificationOptions as NotificationOptions;

	useEffect(() => {
		if (Object.keys(notificationOptions).length >= 1) {
			setShow(true);
		}

		let timer: ReturnType<typeof setTimeout>;
		if (time) {
			timer = setTimeout(() => {
				setShow(false);
			}, time);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [notificationOptions, time]);

	const icons: Icons = {
		success: <AiFillCheckCircle />,
		warning: <AiFillWarning />,
		error: <AiFillCloseCircle />
	};

	return (
		<div className={`${style.notification} ${show && style.animate}`}>
			<div className={`${style.icon} ${style[icon]}`}>{icons[icon]}</div>
			<div className={style.message}>{message}</div>
		</div>
	);
};

export default Notification;
