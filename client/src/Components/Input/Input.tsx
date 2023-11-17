import { ReactNode, FocusEvent, ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import style from "./input.module.scss";

interface InputOptions {
	type: string;
	name: string;
	value: string;
	icon: ReactNode;
	message?: string;
	tabIndex?: number;
}

type Size = "small" | "large";

interface InputHandleProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
	size?: Size;
}

type InputProps = InputHandleProps & InputOptions;

const Input = ({ onChange, onBlur, size, ...options }: InputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { type, name, value, icon, message, tabIndex } = options;

	const handleSetType = (type: string) => {
		return type === "text" ? "text" : showPassword ? "text" : "password";
	};

	const handleShowPassword = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.preventDefault();
		e.button === 0 && setShowPassword(!showPassword);
	};

	return (
		<div className={style.input}>
			<label className={style.icon} htmlFor={name}>
				{icon}
			</label>

			<div className={`${style.control} ${size && style[size]}`}>
				<input
					id={name}
					className={`
						${message && style.error} 
						${type === "password" && style.password}
					`}
					type={handleSetType(type)}
					placeholder=" "
					spellCheck="false"
					autoComplete="off"
					tabIndex={tabIndex}
					name={name}
					value={value}
					onChange={e => onChange(e)}
					onBlur={e => onBlur(e)}
				/>

				<span className={style.placeholder}>{name.replace(/[A-Z]/g, char => ` ${char.toLowerCase()}`)}</span>

				{type === "password" && (
					<button className={style.show} onMouseDown={e => handleShowPassword(e)}>
						{showPassword ? <RiEye2Line /> : <RiEyeCloseLine />}
					</button>
				)}

				{message && <span className={style.message}>* {message}</span>}
			</div>
		</div>
	);
};

export default Input;
