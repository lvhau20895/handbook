import { ReactNode } from "react";
import style from "./title.module.scss";

type Size = 1 | 2 | 3;

interface TitleProps {
	className?: string;
	size?: Size;
	children: ReactNode;
}

const Title = ({ className, size, children }: TitleProps) => {
	const sizeTitle = {
		fontSize: size === 1 ? "30px" : size === 2 ? "25px" : "20px"
	};

	return (
		<h1 style={sizeTitle} className={`${style.title} ${className}`}>
			{children}
		</h1>
	);
};

export default Title;
