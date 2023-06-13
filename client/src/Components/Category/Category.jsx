import React from "react";
import style from "./category.module.scss";
import { Link } from "react-router-dom";

const Category = () => {
    return (
        <div className={style.category}>
            <Link className={style.link}>Friends</Link>
            <Link className={style.link}>Pages</Link>
            <Link className={style.link}>Groups</Link>
            <Link className={style.link}>Messenger</Link>
            <Link className={style.link}>Watch</Link>
        </div>
    );
};

export default Category;
