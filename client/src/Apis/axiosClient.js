import axios from "axios";
import store from "../store";
import { refreshToken } from "Slices/userSlice";

const axiosClient = axios.create({
	baseURL: "http://localhost:1995/api/",
	headers: {
		Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsIjoibGUiLCJ2IjoidmFuIiwiaCI6ImhhdSIsImlhdCI6MTY4NjAxODE3MSwiZXhwIjoxNjk0NjU4MTcxfQ.1kbuwdMr89b80tZjw5ZO7fxOGog7yWwhULC4ZOO-VHo"
	}
});

axiosClient.interceptors.request.use(config => {
	const { token } = store.getState().user || null;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	async response => {
		const originalRequest = response.config;
		if (response.data.message === "jwt expired") {
			const bearerToken = originalRequest.headers["Authorization"];
			await store.dispatch(refreshToken(bearerToken));
			return axiosClient(originalRequest);
		}
		return response.data.result;
	},
	error => {
		if (error.message === "Network Error")
			return Promise.reject("Network Error");
		return Promise.reject(error.response.data.message);
	}
);

export default axiosClient;
