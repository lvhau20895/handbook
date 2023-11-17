import { ReactNode, FormEvent } from "react";
import style from "./form.module.scss";

interface FormProps {
	onSubmit: () => void;
	children: ReactNode;
	className?: string;
}

const Form = ({ onSubmit, children, className }: FormProps) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<form className={`${style.form} ${className}`} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};

export default Form;
