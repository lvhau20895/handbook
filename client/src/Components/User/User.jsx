import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "Slices/userSlice";
import { Link } from "react-router-dom";
import { FaCoins, FaUser, FaUserSecret } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdLiveHelp, MdMeetingRoom } from "react-icons/md";
import useCheckOutside from "Hooks/useCheckOutside";
import style from "./user.module.scss";

const User = () => {
	const [dropdown, setDropdown] = useState(false);
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const menuRef = useRef();

	useCheckOutside(menuRef, () => setDropdown(false));

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const option = [
		{ icon: <FaUser />, title: "Profile" },
		{ icon: <FaCoins />, title: "Payment" },
		{ icon: <AiFillSetting />, title: "Option" },
		{ icon: <MdLiveHelp />, title: "Help" },
		{ icon: <MdMeetingRoom />, title: "Logout" }
	];

	const { profile } = user;

	return (
		<div className={style.user}>
			<div ref={menuRef} className={style.avatar}>
				<button onClick={() => setDropdown(!dropdown)}>
					<img
						src={
							profile?.avatar
								? profile.avatar
								: "/images/avatar/default.png"
						}
						alt="avatar"
					/>
				</button>

				<div
					className={`${style.dropdown} ${
						dropdown ? style.show : ""
					}`}
				>
					<div className={style.option}>
						{user.role === "admin" && (
							<Link className={style.link}>
								<p className={style.icon}>
									<FaUserSecret />
								</p>
								<p className={style.title}>Admin</p>
							</Link>
						)}
						{option.map((item, index) => {
							return (
								<Link key={index} className={style.link}>
									<p className={style.icon}>{item.icon}</p>
									<p className={style.title}>{item.title}</p>
								</Link>
							);
						})}
						<div
							style={{
								height:
									user.role === "admin"
										? `calc(100% / ${option.length + 1})`
										: `calc(100% / ${option.length})`
							}}
							className={style.animate}
						></div>
					</div>
				</div>
			</div>

			<div className={style.info}>
				<p className={style.name}>
					{profile?.nickname ? profile.nickname : user.username}
				</p>
				<p className={style.coin}>
					{profile?.coin
						? Number(profile.coin).toLocaleString()
						: 0 + ".00$"}
				</p>
			</div>
		</div>
	);
};

export default User;
