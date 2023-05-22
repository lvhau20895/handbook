import React, { useState } from "react";
import { BiArrowBack, BiLock, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { Link } from "react-router-dom";
import Validation from "Utils/Validation";
import register from "./register.module.scss";

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (value.startsWith(" ")) return;
        setValues({ ...values, [name]: value });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const message = Validation("register", values);
        setErrors({ ...errors, [name]: message[name] });
    };

    const handleShowPassword = (e, type) => {
        e.preventDefault();
        if (e.button === 0) {
            type === "password"
                ? setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                  })
                : setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                  });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = Validation("register", values);
        if (Object.keys(message).length > 0) {
            return setErrors(message);
        }
    };

    return (
        <div className={register.register}>
            <form onSubmit={handleSubmit}>
                <Link to="/login" className={register.back}>
                    <BiArrowBack />
                </Link>
                <h1 className={register.title}>Sign Up</h1>

                <div className={register.main}>
                    <div className={register.group}>
                        <span className={register.icon}>
                            <BiUser />
                        </span>
                        <div className={register.control}>
                            <input
                                id="username"
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
                            <label htmlFor="username">Username</label>
                            {errors.username && (
                                <span className={register.message}>
                                    * {errors.username}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={register.group}>
                        <span className={register.icon}>
                            <GoMail />
                        </span>
                        <div className={register.control}>
                            <input
                                id="email"
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
                            <label htmlFor="email">Email</label>
                            {errors.email && (
                                <span className={register.message}>
                                    * {errors.email}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={register.group}>
                        <span className={register.icon}>
                            <BiLock />
                        </span>
                        <div className={register.control}>
                            <input
                                id="password"
                                className={register.password}
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
                            <label htmlFor="password">Password</label>
                            <button
                                className={register.showPassword}
                                onMouseDown={(e) =>
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
                        <span className={register.icon}>
                            <GiAnticlockwiseRotation />
                        </span>
                        <div className={register.control}>
                            <input
                                id="confirm-password"
                                className={register.password}
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
                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <button
                                className={register.showPassword}
                                onMouseDown={(e) =>
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
