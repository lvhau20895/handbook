import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import Validation from "Utils/Validation";
import login from "./login.module.scss";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (value.startsWith(" ")) return;
        setValues({ ...values, [name]: value });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const message = Validation("login", values);
        setErrors({ ...errors, [name]: message[name] });
    };

    const handleShowPassword = (e) => {
        e.preventDefault();
        e.button === 0 && setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = Validation("login", values);
        if (Object.keys(message).length > 0) {
            return setErrors(message);
        }
    };

    return (
        <div className={login.login}>
            <form onSubmit={handleSubmit}>
                <h1 className={login.title}>Sign In</h1>

                <div className={login.main}>
                    <div className={login.group}>
                        <span className={login.icon}>
                            <BiUser />
                        </span>
                        <div className={login.control}>
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
                                <span className={login.message}>
                                    * {errors.username}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={login.group}>
                        <span className={login.icon}>
                            <HiOutlineKey />
                        </span>
                        <div className={login.control}>
                            <input
                                id="password"
                                className={login.password}
                                type={showPassword ? "text" : "password"}
                                placeholder=" "
                                spellCheck="false"
                                autoComplete="off"
                                tabIndex="2"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="password">Password</label>
                            <button
                                className={login.showPassword}
                                onMouseDown={(e) => handleShowPassword(e)}
                            >
                                {showPassword ? (
                                    <RiEye2Line />
                                ) : (
                                    <RiEyeCloseLine />
                                )}
                            </button>
                            {errors.password && (
                                <span className={login.message}>
                                    * {errors.password}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className={login.submit}>
                    <button type="submit" tabIndex="3">
                        Sign In
                    </button>
                </div>

                <div className={login.link}>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Sign Up</Link>
                    </p>
                    <Link to="/forgot">Forgot password?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
