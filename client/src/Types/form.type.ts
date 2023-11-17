export interface ValueFormRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ValueFormLogin {
	username: string;
	password: string;
}

export interface ValueFormForgot {
	email: string;
}

export interface Rules {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	email?: boolean;
	confirm?: string;
	special?: boolean;
}

export type ErrorFormRegister = Partial<Record<keyof ValueFormRegister, string>>;
export type ErrorFormLogin = Partial<Record<keyof ValueFormLogin, string>>;
export type ErrorFormForgot = Partial<Record<keyof ValueFormForgot, string>>;

export type FormRegisterRules = Partial<Record<keyof ErrorFormRegister, Rules>>;
export type FormLoginRules = Partial<Record<keyof ErrorFormLogin, Rules>>;
export type FormForgotRules = Partial<Record<keyof ErrorFormForgot, Rules>>;
