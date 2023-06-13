import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Validation from "Utils/Validation";
import useRequest from "Hooks/useRequest";
import userAPI from "Apis/userAPI";
import Notification from "Components/Notification";
import Loading from "Components/Loading";
import style from "./forgot.module.scss";

const Forgot = () => {
    const [values, setValues] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({});
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const { data: handleForgot, loading } = useRequest(
        (values) => userAPI.forgot(values),
        { manual: true }
    );
    const handleChange = (e) => {
        const { value } = e.target;
        if (value.startsWith(" ")) return;
        setValues({ ...values, email: value });
    };

    const handleBlur = (e) => {
        const { value } = e.target;
        if (value !== "") {
            const message = Validation("forgot", values);
            setErrors({ ...errors, email: message.email });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = Validation("forgot", values);

        if (Object.keys(message).length > 0) {
            return setErrors(message);
        }
        try {
            await handleForgot(values);
            setNotification({
                icon: "success",
                message: "Send mail success",
                time: 3000,
            });
            setValues({ email: "" });
            setForgotSuccess(true);
        } catch (error) {
            setNotification({
                icon: "error",
                message: error,
                time: 3000,
            });
            setForgotSuccess(false);
        }
    };

    return (
        <div className={style.forgot}>
            {loading && <Loading />}
            <Notification option={notification} />
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
                    <button type="submit" disabled={loading}>
                        Send
                    </button>
                </div>

                {forgotSuccess && (
                    <div className={style.instruct}>
                        Please check your email to continue
                    </div>
                )}

                <p className={style.link}>
                    <Link className={style.register} to="/register">
                        Create a new account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Forgot;
