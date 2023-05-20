import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import forgot from "./forgot.module.scss";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const Forgot = () => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
        setValue("");
    };

    return (
        <div className={forgot.forgot}>
            <form onSubmit={handleSubmit}>
                <Link to="/login" className={forgot.back}>
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
                            value={value}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
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
