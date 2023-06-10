import React from "react";
import Theme from "Components/Theme";
import { BiBell, BiMessageRounded } from "react-icons/bi";
import Bell from "Components/Bell";
import User from "Components/User";
import style from "./navbar.module.scss";

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <button className={style.item}>
                <Bell />
            </button>

            <button className={style.item}>
                <BiMessageRounded />
            </button>

            <button className={style.item}>
                <BiBell />
            </button>

            <div className={style.user}>
                <User />
            </div>

            <Theme />
        </div>
    );
};

export default Navbar;
