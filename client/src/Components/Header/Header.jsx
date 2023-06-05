import React from "react";
import Logo from "Components/Logo";
import Search from "Components/Search";
import Navbar from "Components/Navbar";
import style from "./header.module.scss";

const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.logo}>
                <Logo />
            </div>

            <div className={style.search}>
                <Search />
            </div>

            <div className={style.navbar}>
                <Navbar />
            </div>
        </div>
    );
};

export default Header;
