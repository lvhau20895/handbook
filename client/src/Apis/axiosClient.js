import axios from "axios";
import store from "../store";
import { refreshToken } from "Slices/userSlice";

const axiosClient = axios.create({
    baseURL: "http://localhost:1995/api/",
    headers: {
        Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsIjoibGUiLCJ2IjoidmFuIiwiaCI6ImhhdSIsImlhdCI6MTY4NjAxODE3MSwiZXhwIjoxNjk0NjU4MTcxfQ.1kbuwdMr89b80tZjw5ZO7fxOGog7yWwhULC4ZOO-VHo",
    },
});

axiosClient.interceptors.request.use((config) => {
    const { token } = store.getState().user || null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data.result;
    },
    async (error) => {
        if (error.message === "Network Error") {
            return Promise.reject("Network Error");
        }
        const originalRequest = error.config;
        if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest.retry
        ) {
            originalRequest.retry = true;
            try {
                const bearerToken = originalRequest.headers["Authorization"];
                await store.dispatch(refreshToken(bearerToken));

                return axiosClient(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error.response.data.message);
    }
);

export default axiosClient;
