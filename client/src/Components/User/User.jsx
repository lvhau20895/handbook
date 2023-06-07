import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "Slices/userSlice";
import style from "./user.module.scss";

const User = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log(user);
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={style.user}>
            <div className={style.avatar}>
                <img
                    src={
                        user.profile?.avatar
                            ? user.profile.avatar
                            : "/images/avatar/default.png"
                    }
                    alt=""
                />
            </div>
        </div>
    );
};

export default User;
