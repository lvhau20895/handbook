import axiosClient from "./axiosClient";

const userAPI = {
    register: (values) => {
        return axiosClient.post("register", values);
    },

    login: (values) => {
        return axiosClient.post("login", values);
    },
};

export default userAPI;
