import React from "react";
import { IoSearch } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { MdClear } from "react-icons/md";
import style from "./search.module.scss";

const Search = () => {
	return (
		<div className={style.search}>
			<form>
				<input type="text" />
				<span className={style.spinner}>
					<ImSpinner9 />
				</span>
				<button className={style.clear}>
					<MdClear />
				</button>
				<button className={style.submit}>
					<IoSearch />
				</button>
			</form>
		</div>
	);
};

export default Search;
