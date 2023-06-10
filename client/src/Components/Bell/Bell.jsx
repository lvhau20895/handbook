import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import style from "./bell.module.scss";

const Bell = () => {
    return (
        <>
            <AiOutlineUserAdd />

            <div className={style.box}></div>
        </>
    );
};

export default Bell;
