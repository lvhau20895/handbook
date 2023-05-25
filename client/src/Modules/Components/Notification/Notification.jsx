import React, { useEffect, useState } from "react";
import style from "./notification.module.scss";

const Notification = ({ option, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	return (
		<div className={style.notification}>
			{option.open && (
				<div className={style.model}>
					<div>{option.icon}</div>
					<div>{option.message}</div>
				</div>
			)}
		</div>
	);
};

export default Notification;
