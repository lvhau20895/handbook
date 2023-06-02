import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Validation from "Utils/Validation";
import style from "./forgot.module.scss";

const Forgot = () => {
	const [values, setValues] = useState({
		email: ""
	});
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();

	const handleChange = e => {
		const { value } = e.target;
		if (value.startsWith(" ")) return;
		setValues({ ...values, email: value });
	};

	const handleBlur = e => {
		const { value } = e.target;
		if (value !== "") {
			const message = Validation("forgot", values);
			setErrors({ ...errors, email: message.email });
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		const message = Validation("forgot", values);

		if (Object.keys(message).length > 0) {
			return setErrors(message);
		}
	};

	return (
		<div className={style.forgot}>
			<form onSubmit={handleSubmit}>
				<Link to={-1} className={style.back}>
					<BiArrowBack />
				</Link>

				<h1 className={style.title}>Forgot Password</h1>

				<div className={style.group}>
					<label htmlFor="email" className={style.icon}>
						<GoMail />
					</label>
					<div className={style.control}>
						<input
							id="email"
							className={errors.email && style.error}
							type="text"
							placeholder=" "
							spellCheck="false"
							autoComplete="off"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<span className={style.placeholder}>Email</span>
						{errors.email && (
							<span className={style.message}>
								* {errors.email}
							</span>
						)}
					</div>
				</div>

				<div className={style.submit}>
					<button type="submit">Send</button>
				</div>

				<p className={style.link}>
					<Link to="/register">Create a new account</Link>
				</p>
			</form>
		</div>
	);
};

export default Forgot;
