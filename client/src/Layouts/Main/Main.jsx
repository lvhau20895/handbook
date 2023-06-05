import React from "react";
import { Outlet } from "react-router-dom";
import Header from "Components/Header";
import style from "./main.module.scss";

const Main = () => {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <Header />
            </div>

            <div className={style.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
