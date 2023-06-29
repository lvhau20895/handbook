import React, { useState } from "react";
import style from "./publish.module.scss";
import {
	FaCommentDots,
	FaGlobeAmericas,
	FaUserEdit,
	FaUserFriends
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Publish = () => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(0);
	const [mode, setMode] = useState(false);

	const options = [
		{
			type: "global",
			description: "Anyone can see this news",
			icon: <FaGlobeAmericas />
		},
		{
			type: "friend",
			description: "Only friends can see this news",
			icon: <FaUserFriends />
		},
		{
			type: "alone",
			description: "Only I can see this news",
			icon: <FaUserEdit />
		}
	];

	return (
		<div className={style.publish}>
			<div className={style.represent} onClick={() => setOpen(!open)}>
				<IoSettingsSharp />
			</div>

			<div className={`${style.modal} ${open ? style.show : ""}`}>
				<div
					className={style.overlay}
					onClick={() => setOpen(false)}
				></div>
				<div className={style.main}>
					<h1 className={style.head}>Publishing Mode</h1>

					{options.map((option, index) => {
						return (
							<div key={index} className={style.group}>
								<label
									htmlFor={option.type}
									className={style.wrap}
								>
									<div className={style.description}>
										<div className={style.icon}>
											{option.icon}
										</div>
										<div className={style.text}>
											<p className={style.title}>
												{option.type}
											</p>
											<p className={style.sub}>
												{option.description}
											</p>
										</div>
									</div>

									<div className={style.check}>
										<span
											className={`${style.circle} ${
												index === checked
													? style.checked
													: ""
											}`}
										></span>
									</div>
								</label>
								<input
									id={option.type}
									className={style.radio}
									type="radio"
									name="publish"
									onChange={() => setChecked(index)}
								/>
							</div>
						);
					})}

					<hr className={style.line} />

					<div className={style.comment}>
						<div className={style.description}>
							<p className={style.icon}>
								<FaCommentDots />
							</p>
							<p className={style.title}>Comments</p>
						</div>

						<div
							className={`${style.switch} ${
								mode ? style.checked : ""
							}`}
							onClick={() => setMode(!mode)}
						>
							<span className={style.mode}></span>
						</div>
					</div>

					<div className={style.action}>
						<button
							className={style.cancel}
							onClick={() => setOpen(false)}
						>
							Cancel
						</button>
						<button className={style.save}>Save</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Publish;
