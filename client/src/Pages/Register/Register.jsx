import React, { useState } from "react";
import { BiArrowBack, BiLock, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import useRequest from "Hooks/useRequest";
import userAPI from "Apis/userAPI";
import Validation from "Utils/Validation";
import Notification from "Components/Notification";
import style from "./register.module.scss";

const Register = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false
	});
	const [errors, setErrors] = useState({});
	const [notification, setNotification] = useState({});

	const navigate = useNavigate();

	const { data: handleRegister, loading } = useRequest(
		values => userAPI.register(values),
		{ manual: true }
	);

	const handleChange = e => {
		const { value, name } = e.target;
		if (value.startsWith(" ")) return;
		setValues({ ...values, [name]: value });
	};

	const handleBlur = e => {
		const { name, value } = e.target;
		if (value !== "") {
			const message = Validation("register", values);
			setErrors({ ...errors, [name]: message[name] });
		}
	};

	const handleShowPassword = (e, type) => {
		e.preventDefault();
		if (e.button === 0) {
			type === "password"
				? setShowPassword({
						...showPassword,
						password: !showPassword.password
				  })
				: setShowPassword({
						...showPassword,
						confirmPassword: !showPassword.confirmPassword
				  });
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const message = Validation("register", values);
		if (Object.keys(message).length > 0) {
			return setErrors(message);
		}
		const { username, email, password } = values;
		const newValues = { username, email, password };
		try {
			await handleRegister(newValues);
			setNotification({
				icon: "success",
				message: "Sign up success!",
				time: 1500
			});
			setValues({
				username: "",
				email: "",
				password: "",
				confirmPassword: ""
			});
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} catch (error) {
			console.log(error);
			setNotification({
				icon: "error",
				message: error,
				time: 3000
			});
		}
	};

	return (
		<div className={style.register}>
			<Notification option={notification} />
			<form onSubmit={handleSubmit}>
				<Link to="/login" className={style.back}>
					<BiArrowBack />
				</Link>
				<h1 className={style.title}>Sign Up</h1>

				<div className={style.main}>
					<div className={style.group}>
						<label htmlFor="username" className={style.icon}>
							<BiUser />
						</label>
						<div className={style.control}>
							<input
								id="username"
								className={errors.username && style.error}
								type="text"
								placeholder=" "
								spellCheck="false"
								autoComplete="off"
								tabIndex="1"
								name="username"
								value={values.username}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<span className={style.placeholder}>Username</span>
							{errors.username && (
								<span className={style.message}>
									* {errors.username}
								</span>
							)}
						</div>
					</div>

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
								tabIndex="2"
								name="email"
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

					<div className={style.group}>
						<label htmlFor="password" className={style.icon}>
							<BiLock />
						</label>
						<div className={style.control}>
							<input
								id="password"
								className={`${style.password} ${
									errors.password ? style.error : ""
								}`}
								type={
									showPassword.password ? "text" : "password"
								}
								placeholder=" "
								spellCheck="false"
								autoComplete="off"
								tabIndex="3"
								name="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<span className={style.placeholder}>Password</span>
							<button
								className={style.showPassword}
								onMouseDown={e =>
									handleShowPassword(e, "password")
								}
							>
								{showPassword.password ? (
									<RiEye2Line />
								) : (
									<RiEyeCloseLine />
								)}
							</button>
							{errors.password && (
								<span className={style.message}>
									* {errors.password}
								</span>
							)}
						</div>
					</div>

					<div className={style.group}>
						<label
							htmlFor="confirm-password"
							className={style.icon}
						>
							<GiAnticlockwiseRotation />
						</label>
						<div className={style.control}>
							<input
								id="confirm-password"
								className={`${style.password} ${
									errors.confirmPassword && style.error
								}`}
								type={
									showPassword.confirmPassword
										? "text"
										: "password"
								}
								placeholder=" "
								spellCheck="false"
								autoComplete="off"
								tabIndex="4"
								name="confirmPassword"
								value={values.confirmPassword}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<span className={style.placeholder}>
								Confirm Password
							</span>
							<button
								className={style.showPassword}
								onMouseDown={e =>
									handleShowPassword(e, "confirmPassword")
								}
							>
								{showPassword.confirmPassword ? (
									<RiEye2Line />
								) : (
									<RiEyeCloseLine />
								)}
							</button>
							{errors.confirmPassword && (
								<span className={style.message}>
									* {errors.confirmPassword}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className={style.submit}>
					<button
						type="submit"
						disabled={loading ? true : false}
						tabIndex="5"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
