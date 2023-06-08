import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "Slices/userSlice";
import { Link } from "react-router-dom";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import { MdLiveHelp } from "react-icons/md";
import style from "./user.module.scss";

const User = () => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const { profile } = user;

	return (
		<div className={style.user}>
			<button className={style.avatar}>
				<img
					src={
						profile?.avatar
							? profile.avatar
							: "/images/avatar/default.png"
					}
					alt="avatar"
				/>
			</button>

			<div className={style.action}>
				<Link>
					<FaUserSecret />
					<p>Admin</p>
				</Link>
				<Link>
					<FaUser />
					<p>Profile</p>
				</Link>
				<Link>
					<AiFillSetting />
					<p>Setting</p>
				</Link>
				<Link>
					<MdLiveHelp />
					<p>Help</p>
				</Link>
				<Link>
					<ImExit />
					<p>Logout</p>
				</Link>
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
