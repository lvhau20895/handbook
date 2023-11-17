import { ChangeEvent, FocusEvent, useState } from "react";
import { BiUser } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { ErrorFormLogin, FormLoginRules, ValueFormLogin } from "Types/form.type";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationContext } from "Contexts/NotificationProvider";
import { useAppDispatch } from "store";
import { login } from "Thunks/user.thunk";
import usePageTitle from "Hooks/usePageTitle";
import validation from "Utils/validation";
import resetForm from "Utils/resetForm";
import Form from "Components/Form";
import Title from "Components/Title";
import Wrap from "Components/Wrap";
import Input from "Components/Input";
import Button from "Components/Button";
import Text from "Components/Text";
import style from "./login.module.scss";

const Login = () => {
	const [values, setValues] = useState<ValueFormLogin>({
		username: "",
		password: ""
	});
	const [errors, setErrors] = useState<ErrorFormLogin>({});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { handleNotification } = useNotificationContext();

	const formValidationRules: FormLoginRules = {
		username: { required: true, minLength: 5, maxLength: 10, special: true },
		password: { required: true, minLength: 5, maxLength: 20, special: true }
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
		try {
			await dispatch(login(values)).unwrap();
			handleNotification({
				icon: "success",
				message: "Sign in success!",
				time: 1500
			});
			resetForm(values);
			setTimeout(() => {
				navigate("/");
			}, 1500);
		} catch (error) {
			handleNotification({
				icon: "error",
				message: `${error}`,
				time: 3000
			});
		}
	};

	usePageTitle("Sign in");

	return (
		<Form onSubmit={handleSubmit}>
			<Title size={1}>Sign In</Title>

			<Wrap className={style.field}>
				<Input
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
					type="password"
					name="password"
					value={values.password}
					icon={<HiOutlineKey />}
					message={errors.password}
					tabIndex={2}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Wrap>

			<Button>Sign In</Button>

			<Wrap className={style.navigate}>
				<Link to="/forgot" className={style.link}>
					Forgot password?
				</Link>

				<Text className={style.linkDescription}>
					Don't have an account?{" "}
					<Link to="/register" className={style.link}>
						Sign up
					</Link>
				</Text>
			</Wrap>
		</Form>
	);
};

export default Login;
