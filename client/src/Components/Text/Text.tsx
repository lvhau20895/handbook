import { ReactNode } from "react";
import style from "./text.module.scss";

interface TextProps {
	className?: string;
	children: ReactNode;
}

const Text = ({ className, children }: TextProps) => {
	return <div className={`${style.text} ${className}`}>{children}</div>;
};

export default Text;
