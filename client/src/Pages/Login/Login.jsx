import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Slices/userSlice";
import Validation from "Utils/Validation";
import Notification from "Components/Notification";
import Loading from "Components/Loading";
import style from "./login.module.scss";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({});

    const { loading } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (value.startsWith(" ")) return;
        setValues({ ...values, [name]: value });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value !== "") {
            const message = Validation("login", values);
            setErrors({ ...errors, [name]: message[name] });
        }
    };

    const handleShowPassword = (e) => {
        e.preventDefault();
        e.button === 0 && setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = Validation("login", values);
        if (Object.keys(message).length > 0) {
            return setErrors(message);
        }
        try {
            await dispatch(login(values)).unwrap();
            navigate("/");
        } catch (error) {
            setNotification({
                icon: "error",
                message: error,
                time: 3000,
            });
        }
    };

    return (
        <div className={style.login}>
            {loading && <Loading />}
            <Notification option={notification} />
            <form onSubmit={handleSubmit}>
                <h1 className={style.title}>Sign In</h1>

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
                        <label htmlFor="password" className={style.icon}>
                            <HiOutlineKey />
                        </label>
                        <div className={style.control}>
                            <input
                                id="password"
                                className={`${style.password} ${
                                    errors.password ? style.error : ""
                                }`}
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
                            <span className={style.placeholder}>Password</span>
                            <button
                                className={style.showPassword}
                                onMouseDown={(e) => handleShowPassword(e)}
                            >
                                {showPassword ? (
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
                </div>

                <div className={style.submit}>
                    <button type="submit" tabIndex="3" disabled={loading}>
                        Sign In
                    </button>
                </div>

                <div className={style.link}>
                    <p className={style.register}>
                        Don't have an account?{" "}
                        <Link to="/register">Sign Up</Link>
                    </p>
                    <Link className={style.forgot} to="/forgot">
                        Forgot password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
