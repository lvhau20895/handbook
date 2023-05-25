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

const Confirm = () => {
	toast(
		<div>
			<span>text</span>
			<div>
				<button>ok</button>
				<button>close</button>
			</div>
		</div>,
		{ position: "center-center" }
	);
};

export { Notification, Confirm };
