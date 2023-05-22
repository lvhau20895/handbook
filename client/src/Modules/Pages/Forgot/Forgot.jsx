import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import forgot from "./forgot.module.scss";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Validation from "Utils/Validation";
const Forgot = () => {
    const [values, setValues] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.startsWith(" ")) return;
        setValues({ ...values, email: value });
    };

    const handleBlur = () => {
        const message = Validation("forgot", values);
        setErrors({ ...errors, email: message.email });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = Validation("forgot", values);

        if (Object.keys(message).length > 0) {
            return setErrors(message);
        }
    };

    return (
        <div className={forgot.forgot}>
            <form onSubmit={handleSubmit}>
                <Link to={-1} className={forgot.back}>
                    <BiArrowBack />
                </Link>

                <h1 className={forgot.title}>Forgot Password</h1>

                <div className={forgot.group}>
                    <div className={forgot.icon}>
                        <GoMail />
                    </div>
                    <div className={forgot.control}>
                        <input
                            id="email"
                            type="text"
                            placeholder=" "
                            spellCheck="false"
                            autoComplete="off"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="email">Email</label>
                        {errors.email && (
                            <span className={forgot.message}>
                                * {errors.email}
                            </span>
                        )}
                    </div>
                </div>

                <div className={forgot.submit}>
                    <button type="submit">Send</button>
                </div>

                <p className={forgot.link}>
                    <Link to="/register">Create a new account</Link>
                </p>
            </form>
        </div>
    );
};

export default Forgot;
