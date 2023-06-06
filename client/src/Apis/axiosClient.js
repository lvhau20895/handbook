import axios from "axios";
import store from "../store";

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
	response => {
		return response.data.result;
	},
	async error => {
		if (error.message === "Network Error") {
			return Promise.reject("Network Error");
		}
		const originalRequest = error.config;
		if (
			error.response.data.message === "jwt expired" &&
			!originalRequest.retry
		) {
			originalRequest.retry = true;
			try {
				const bearerToken = originalRequest.headers["Authorization"];
				const newToken = await axiosClient.get("refresh-token", {
					headers: {
						Authorization: bearerToken
					}
				});
				localStorage.setItem("token", JSON.stringify(newToken));
				originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
				return axiosClient(originalRequest);
			} catch (error) {
				console.log(error);
			}
		}
		return Promise.reject(error.response.data.message);
	}
);

export default axiosClient;
