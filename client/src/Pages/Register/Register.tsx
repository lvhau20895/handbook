import { ChangeEvent, FocusEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { ErrorFormRegister, FormRegisterRules, ValueFormRegister } from "Types/form.type";
import { BiLock, BiUser } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { HiArrowSmLeft } from "react-icons/hi";
import { useNotificationContext } from "Contexts/NotificationProvider";
import { register } from "Thunks/user.thunk";
import usePageTitle from "Hooks/usePageTitle";
import Form from "Components/Form";
import Title from "Components/Title";
import Wrap from "Components/Wrap";
import Input from "Components/Input";
import Button from "Components/Button";
import validation from "Utils/validation";
import resetForm from "Utils/resetForm";
import style from "./register.module.scss";

const Register = () => {
	const [values, setValues] = useState<ValueFormRegister>({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState<ErrorFormRegister>({});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { handleNotification } = useNotificationContext();

	const formValidationRules: FormRegisterRules = {
		username: { required: true, minLength: 5, maxLength: 10, special: true },
		email: { required: true, email: true },
		password: { required: true, minLength: 5, maxLength: 20, special: true },
		confirmPassword: { required: true, confirm: values.password }
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (value.startsWith(" ")) return;
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
		const { name, value } = e.target;
		if (value !== "" || errors.hasOwnProperty(name)) {
			const { message } = validation(values, formValidationRules);
			setErrors({
				...errors,
				[name]: message[name]
			});
		}
	};

	const handleSubmit = async () => {
		const { message, isValid } = validation(values, formValidationRules);
		if (!isValid) {
			setErrors(message);
			return;
		}
		const newValues: Omit<ValueFormRegister, "confirmPassword"> = {
			username: values.username,
			email: values.email,
			password: values.password
		};
		try {
			await dispatch(register(newValues)).unwrap();
			handleNotification({
				icon: "success",
				message: "Sign up success!",
				time: 1500
			});
			resetForm(values);
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} catch (error) {
			handleNotification({
				icon: "error",
				message: error as string,
				time: 3000
			});
		}
	};

	usePageTitle("Sign up");

	return (
		<Form onSubmit={handleSubmit} className={style.form}>
			<Link to="/login" className={style.back}>
				<HiArrowSmLeft />
			</Link>

			<Title size={1}>Sign Up</Title>

			<Wrap className={style.group}>
				<Input
					size="small"
					type="text"
					name="username"
					value={values.username}
					icon={<BiUser />}
					message={errors.username}
					tabIndex={1}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<Input
					size="small"
					type="text"
					name="email"
					value={values.email}
					icon={<IoMailOutline />}
					message={errors.email}
					tabIndex={2}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<Input
					size="small"
					type="password"
					name="password"
					value={values.password}
					icon={<BiLock />}
					message={errors.password}
					tabIndex={3}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<Input
					size="small"
					type="password"
					name="confirmPassword"
					value={values.confirmPassword}
					icon={<GiAnticlockwiseRotation />}
					message={errors.confirmPassword}
					tabIndex={4}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Wrap>

			<Button>Sign Up</Button>
		</Form>
	);
};

export default Register;
