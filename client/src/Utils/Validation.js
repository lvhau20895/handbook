const Validation = (type, values) => {
	// const checkRequired = (name, value) => {
	// 	if (value.trim() === "") return `Please enter your ${name}`;
	// 	return;
	// };

	// const checkLength = (name, value, min, max) => {
	// 	if (
	// 		value.length < min ||
	// 		value.length > max ||
	// 		value.indexOf(" ") !== -1
	// 	) {
	// 		return `${name} from ${min} to ${max} characters & no spaces`;
	// 	}
	// 	return;
	// };

	const message = {};
	switch (type) {
		case "register":
			const { username, email, password, confirmPassword } = values;

			if (username === "") {
				message.username = "Please enter your username";
			} else if (
				username.length < 5 ||
				username.length > 10 ||
				username.indexOf(" ") !== -1
			) {
				message.username =
					"Username from 5 to 10 characters & no spaces";
			}

			if (email === "") {
				message.email = "Please enter your email";
			} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/.test(email)) {
				message.email = "Invalid email";
			}

			if (password === "") {
				message.password = "Please enter your password";
			} else if (
				password.trim().length < 5 ||
				password.trim().length > 10 ||
				password.indexOf(" ") !== -1
			) {
				message.password =
					"Password from 5 to 10 characters & no spaces";
			}

			if (confirmPassword === "") {
				message.confirmPassword = "Please enter your confirmPassword";
			} else if (confirmPassword !== password) {
				message.confirmPassword = "Incorrect password";
			}

			break;

		default:
			break;
	}

	return message;
};

export default Validation;
