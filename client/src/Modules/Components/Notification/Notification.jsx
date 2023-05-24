import React from "react";
import notification from "./notification.module.scss";
const Notification = ({ alert }) => {
	return (
		<div className={notification.notification}>
			<span>{alert.icon}</span>
			<span>{alert.message}</span>
		</div>
	);
};

export default Notification;
