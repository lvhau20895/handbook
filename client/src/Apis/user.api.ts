import axiosConfig from "./axios.config";

const userAPI = {
	refreshToken: <T>(): Promise<T> => {
		return axiosConfig.get("refresh-token");
	},

	register: <T>(values: T) => {
		return axiosConfig.post("user/register", values);
	},

	login: <T>(values: T): Promise<string> => {
		return axiosConfig.post("user/login", values);
	},

	forgot: <T>(values: T) => {
		return axiosConfig.post("user/forgot", values);
	}
};

export default userAPI;
