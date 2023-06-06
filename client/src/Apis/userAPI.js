import axiosClient from "./axiosClient";

const userAPI = {
	register: values => {
		return axiosClient.post("user/register", values);
	},

	login: values => {
		return axiosClient.post("user/login", values);
	},

	forgot: values => {
		return axiosClient.post("user/forgot", values);
	},

	getUser: () => {
		return axiosClient.get("user/get-user");
	}
};

export default userAPI;
