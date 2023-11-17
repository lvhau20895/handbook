import { refreshToken } from "Thunks/user.thunk";
import axios from "axios";
import store from "store";

interface Result {
	statusCode: number;
	message: string;
	result?: any;
}

const axiosConfig = axios.create({
	baseURL: `${process.env.REACT_APP_HOST}api/`,
	headers: { token: process.env.REACT_APP_TOKEN }
});

axiosConfig.interceptors.request.use(config => {
	const { token } = store.getState().user || null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosConfig.interceptors.response.use(
	async response => {
		if (response.data.message === "jwt expired") {
			await store.dispatch(refreshToken());
			return axiosConfig(response.config);
		}
		const data: Result = response.data;
		return data.result;
	},
	error => {
		if (error.message === "Network Error") return Promise.reject("Network Error");
		return Promise.reject(error.response.data.message);
	}
);

export default axiosConfig;
