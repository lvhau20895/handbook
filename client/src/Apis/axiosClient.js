import axios from "axios";
import store from "../store";

const axiosClient = axios.create({
	baseURL: "http://localhost:1995/api/",
	headers: {
		Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsIjoibGUiLCJ2IjoidmFuIiwiaCI6ImhhdSIsImlhdCI6MTY4NDgzNTUyMSwiZXhwIjoxNjkzNDc1NTIxfQ.KyF0N_A0IsudrAaLPOgrudfyDokZFHWkLObEHmDeTo4"
	}
});

axiosClient.interceptors.request.use(config => {
	const { token } = store.getState().user;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	response => {
		return response.data.result;
	},
	error => {
		return Promise.reject(error.response.data.message);
	}
);

export default axiosClient;
