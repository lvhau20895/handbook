import toast from "react-hot-toast";

const Notification = (...params) => {
	const [icon, message, time = 3000] = params;
	toast.dismiss();
	toast[icon](message, {
		position: "top-center",
		duration: time,
		style: {
			background: "var(--notification)",
			color: "var(--text)"
		}
	});
};

export default Notification;
