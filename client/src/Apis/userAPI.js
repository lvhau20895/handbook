import axiosClient from "./axiosClient";

const userAPI = {
    refreshToken: (bearer) => {
        return axiosClient.get("refresh-token", {
            headers: { Authorization: bearer },
        });
    },

    register: (values) => {
        return axiosClient.post("user/register", values);
    },

    login: (values) => {
        return axiosClient.post("user/login", values);
    },

    forgot: (values) => {
        return axiosClient.post("user/forgot", values);
    },

    getUser: () => {
        return axiosClient.get("user/get-user");
    },
};

export default userAPI;
