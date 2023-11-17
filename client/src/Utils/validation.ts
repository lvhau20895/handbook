import { Rules } from "Types/form.type";

type FormRules = Record<string, Rules>;
type Message = { [key: string]: string };

const validation = <T>(values: T, rules: FormRules) => {
	const message: Message = {};
	let isValid: boolean = true;

	const regexUpperChar = /[A-Z]/g;
	const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/;
	const regexSpecialChar = /^[a-z0-9]+$/;

	const checkRequired = (value: string) => value.trim() !== "";
	const checkSpecialChar = (value: string) => regexSpecialChar.test(value);
	const checkLength = (value: string, min: number, max: number) => value.length >= min && value.length <= max;
	const checkEmail = (email: string) => regexEmail.test(email);
	const checkConfirm = (password: string, confirm: string) => confirm === password;
	const formatField = (value: string) => value.replace(regexUpperChar, (char: string) => ` ${char.toLowerCase()}`);

	for (let key in values) {
		const value = values[key] as string;
		const rule = rules[key];

		const conditions = [];

		if (rule.required && !checkRequired(value)) {
			const formatName = formatField(key);
			conditions.push(`please enter your ${formatName}`);
		}
		if (rule.special && !checkSpecialChar(value)) {
			conditions.push("no special characters or capitalization");
		}
		if (rule.minLength && rule.maxLength && !checkLength(value, rule.minLength, rule.maxLength)) {
			conditions.push(`${key} from ${rule.minLength} to ${rule.maxLength} character`);
		}
		if (rule.email && !checkEmail(value)) {
			conditions.push("Invalid email");
		}
		if (rule.confirm && !checkConfirm(rule.confirm, value)) {
			conditions.push("Incorrect password");
		}

		message[key] = conditions.length > 0 ? conditions[0] : "";
		if (message[key]) isValid = false;
	}

	return { message, isValid };
};
export default validation;
