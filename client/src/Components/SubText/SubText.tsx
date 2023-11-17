import { ReactNode } from "react";
import style from "./subText.module.scss";

interface SubTextProps {
	className?: string;
	children: ReactNode;
}

const SubText = ({ className, children }: SubTextProps) => {
	return <span className={`${style.subText} ${className}`}>{children}</span>;
};

export default SubText;
