import React from "react";
import Theme from "Components/Theme";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import style from "./navbar.module.scss";

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <button className={style.item}>
                <AiOutlineUserAdd />
            </button>

            <button className={style.item}>
                <BiMessageRounded />
            </button>

            <button className={style.item}>
                <IoNotificationsOutline />
            </button>

            <Theme />
        </div>
    );
};

export default Navbar;
