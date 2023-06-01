import React, { useEffect, useState } from "react";
import style from "./confirm.module.scss";

const Confirm = ({ option, onConfirm }) => {
	const { type, content } = option;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (Object.keys(option).length >= 1) setOpen(true);
	}, [option]);

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<div className={style.confirm}>
			<div
				style={{
					visibility: open ? "visible" : "hidden",
					opacity: open ? 1 : 0
				}}
				className={style.overlay}
				onClick={handleCancel}
			></div>
			<div className={`${style.box} ${open && style.animate}`}>
				<p className={style.content}>{content}</p>
				<div className={style.action}>
					<button
						className={`${style.confirm} ${type && style[type]}`}
						onClick={handleConfirm}
					>
						Yes
					</button>
					<button className={style.cancel} onClick={handleCancel}>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
