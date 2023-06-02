import React from "react";
import style from "./loading.module.scss";

const Loading = () => {
    return (
        <div className={style.loading}>
            <div className={style.wrapper}>
                <div className={style.circle}>
                    <span className={style.bounce}></span>
                    <span className={style.bounce}></span>
                    <span className={style.bounce}></span>
                </div>
                <div className={style.shadow}>
                    <span className={style.dark}></span>
                    <span className={style.dark}></span>
                    <span className={style.dark}></span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
