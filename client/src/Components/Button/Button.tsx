import { useAppSelector } from "store";
import style from "./button.module.scss";

interface ButtonProps {
	onClick?: () => void;
	className?: string;
	children: string;
}

const Button = ({ onClick, className, children }: ButtonProps) => {
	const { loading } = useAppSelector(state => state.user);

	return (
		<button className={`${style.button} ${className}`} disabled={loading} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
