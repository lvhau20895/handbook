import axiosClient from "./axiosClient";

const userAPI = {
	register: values => {
		return axiosClient.post("user/register", values);
	},

	login: values => {
		return axiosClient.post("user/login", values);
	}
};

export default userAPI;
