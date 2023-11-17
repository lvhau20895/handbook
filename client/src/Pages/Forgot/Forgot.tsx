import { useState, ChangeEvent, FocusEvent } from "react";
import { ErrorFormForgot, FormForgotRules, ValueFormForgot } from "Types/form.type";
import { Link } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { HiArrowSmLeft } from "react-icons/hi";
import { BiRightArrowAlt } from "react-icons/bi";
import { useAppDispatch } from "store";
import { forgot } from "Thunks/user.thunk";
import { useNotificationContext } from "Contexts/NotificationProvider";
import resetForm from "Utils/resetForm";
import validation from "Utils/validation";
import Form from "Components/Form";
import Input from "Components/Input";
import Title from "Components/Title";
import Wrap from "Components/Wrap";
import usePageTitle from "Hooks/usePageTitle";
import Button from "Components/Button";
import style from "./forgot.module.scss";

const Forgot = () => {
	const [values, setValues] = useState<ValueFormForgot>({ email: "" });
	const [errors, setErrors] = useState<ErrorFormForgot>({});
	const [forgotSuccess, setForgotSuccess] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const { handleNotification } = useNotificationContext();

	const formValidationRules: FormForgotRules = {
		email: { required: true, email: true }
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value.startsWith(" ")) return;
		setValues({ ...values, email: value });
		setErrors({ ...errors, email: "" });
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
		const { name, value } = e.target;
		if (value !== "" || errors.hasOwnProperty(name)) {
			const { message } = validation(values, formValidationRules);

			setErrors({ ...errors, email: message.email });
		}
	};

	const handleSubmit = async () => {
		const { message, isValid } = validation(values, formValidationRules);
		if (!isValid) {
			setErrors(message);
			return;
		}
		try {
			await dispatch(forgot(values)).unwrap();
			resetForm(values);
			handleNotification({
				icon: "success",
				message: "Forgot success!",
				time: 1500
			});
			setForgotSuccess(true);
		} catch (error) {
			handleNotification({
				icon: "error",
				message: "" + error,
				time: 3000
			});
			setForgotSuccess(false);
		}
	};

	usePageTitle("Forgot");

	return (
		<Form onSubmit={handleSubmit} className={style.form}>
			<Link to="/login" className={style.back}>
				<HiArrowSmLeft />
			</Link>

			<Title size={1}>Forgot</Title>

			<Wrap className={style.group}>
				<Input
					size="large"
					type="text"
					name="email"
					value={values.email}
					icon={<IoMailOutline />}
					message={errors.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Wrap>

			<Button className={style.submit}>Send</Button>

			{forgotSuccess && (
				<Link to="https://mail.google.com" target="_blank" className={style.linkEmail}>
					<span className={style.linkDescription}>Please check your email to continue</span>
					<BiRightArrowAlt className={style.linkIcon} />
				</Link>
			)}
		</Form>
	);
};

export default Forgot;
