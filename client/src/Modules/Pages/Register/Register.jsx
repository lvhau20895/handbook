import React, { useState } from "react";
import { BiArrowBack, BiLock, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Validation from "Utils/Validation";
import useRequest from "Modules/Hooks/useRequest";
import userAPI from "Apis/userAPI";
import { Slide, ToastContainer, toast } from "react-toastify";
import register from "./register.module.scss";

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
		// const message = Validation("register", values);
		// if (Object.keys(message).length > 0) {
		// 	return setErrors(message);
		// }
		// try {
		// 	await handleRegister(values);
		// } catch (error) {}
		toast.success("Successful registration!", {
			position: "top-center",
			autoClose: 1000,
			closeOnClick: true,
			pauseOnHover: true,
			theme: "light",

			transition: Slide
		});
		setTimeout(() => {
			navigate("/login");
		}, 2000);
	};

	return (
		<div className={register.register}>
			<ToastContainer />
			<form onSubmit={handleSubmit}>
				<Link to="/login" className={register.back}>
					<BiArrowBack />
				</Link>
				<h1 className={register.title}>Sign Up</h1>

				<div className={register.main}>
					<div className={register.group}>
						<label htmlFor="username" className={register.icon}>
							<BiUser />
						</label>
						<div className={register.control}>
							<input
								id="username"
								className={errors.username && register.error}
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
							<span className={register.placeholder}>
								Username
							</span>
							{errors.username && (
								<span className={register.message}>
									* {errors.username}
								</span>
							)}
						</div>
					</div>

					<div className={register.group}>
						<label htmlFor="email" className={register.icon}>
							<GoMail />
						</label>
						<div className={register.control}>
							<input
								id="email"
								className={errors.email && register.error}
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
							<span className={register.placeholder}>Email</span>
							{errors.email && (
								<span className={register.message}>
									* {errors.email}
								</span>
							)}
						</div>
					</div>

					<div className={register.group}>
						<label htmlFor="password" className={register.icon}>
							<BiLock />
						</label>
						<div className={register.control}>
							<input
								id="password"
								className={`${register.password} ${
									errors.password ? register.error : ""
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
							<span className={register.placeholder}>
								Password
							</span>
							<button
								className={register.showPassword}
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
								<span className={register.message}>
									* {errors.password}
								</span>
							)}
						</div>
					</div>

					<div className={register.group}>
						<label
							htmlFor="confirm-password"
							className={register.icon}
						>
							<GiAnticlockwiseRotation />
						</label>
						<div className={register.control}>
							<input
								id="confirm-password"
								className={`${register.password} ${
									errors.confirmPassword && register.error
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
							<span className={register.placeholder}>
								Confirm Password
							</span>
							<button
								className={register.showPassword}
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
								<span className={register.message}>
									* {errors.confirmPassword}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className={register.submit}>
					<button type="submit" tabIndex="5">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
