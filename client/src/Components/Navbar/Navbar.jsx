import React, { useEffect } from "react";
import Theme from "Components/Theme";
import { BiBell, BiMessageRounded } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import style from "./navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "Slices/userSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log(user);
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={style.navbar}>
            <button className={style.item}>
                <AiOutlineUserAdd />
            </button>

            <button className={style.item}>
                <BiMessageRounded />
            </button>

            <button className={style.item}>
                <BiBell />
            </button>

            <Theme />
        </div>
    );
};

export default Navbar;
