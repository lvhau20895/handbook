const Validation = (form, values) => {
	const message = {};

	const checkRequired = (name, value) => {
		const formatName = name.replace(
			/[A-Z]/g,
			char => ` ${char.toLowerCase()}`
		);
		if (value === "") message[name] = `Please enter your ${formatName}`;
	};

	const checkLength = (name, value, min, max) => {
		if (
			(value.length >= 1 && value.length < min) ||
			value.length > max ||
			value.indexOf(" ") !== -1
		)
			message[name] = `${
				name[0].toUpperCase() + name.slice(1)
			} from ${min} to ${max} characters & no spaces`;
	};

	const checkEmail = email => {
		if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/.test(email) && email.length >= 1)
			message.email = "Invalid email";
	};

	const checkConfirmPassword = (password, confirmPassword) => {
		if (confirmPassword !== password)
			message.confirmPassword = "Incorrect password";
	};

	switch (form) {
		case "register":
			{
				const { username, email, password, confirmPassword } = values;
				checkRequired("username", username);
				checkLength("username", username, 5, 10);

				checkRequired("email", email);
				checkEmail(email);

				checkRequired("password", password);
				checkLength("password", password, 5, 20);

				checkRequired("confirmPassword", confirmPassword);
				checkConfirmPassword(password, confirmPassword);
			}
			break;
		case "login":
			{
				const { username, password } = values;
				checkRequired("username", username);
				checkLength("username", username, 5, 10);

				checkRequired("password", password);
				checkLength("password", password, 5, 20);
			}
			break;
		case "forgot":
			{
				const { email } = values;
				checkRequired("email", email);
				checkEmail(email);
			}
			break;
		default:
			break;
	}

	return message;
};

export default Validation;
