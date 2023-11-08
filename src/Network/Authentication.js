import { getApiUrl } from "../Utils/Config/getApiUrl";
import axios, { all } from "axios";

export const Authentication = {

    async login(data, success, failure) {
        return axios.post(`${getApiUrl}/auth/login`, data).then((response) => {
            if (response) {
                localStorage.setItem("accessToken", response.data.token);
                const { user } = response.data.user;
                success(user);
            }
        }).catch((err) => failure(err.response.data));
    },

    signOut(callback) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userinfo");
        callback();
    },

    async signUp({ username, password, email, phonenumber }, success, failure) {
        return axios.post(`${getApiUrl}/auth`, { username, password, email, phonenumber })
            .then((response) => {
                success();
            }).catch((err) => {
                if (err.response.data === "Email đã được sử dụng") {
                    failure(err.response.data);
                } else if (err.response.data === "Tên người dùng đã tồn tại") {
                    failure(err.response.data);
                }
            });
    },

    async getCode(data) {
        return axios.post(`${getApiUrl}/auth/verify`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async changeInfo(data, userId) {

        return axios.put(`${getApiUrl}/auth/changeinfo/${userId}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    },

    async refreshStateUser(accessToken) {
        return axios
            .get(`${getApiUrl}/auth`, {
                headers: {
                    accessToken: accessToken,
                }
            }).catch((error) => { });
    },

    async refreshToken() {
        return axios.get(`${getApiUrl}/auth/profile`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    },

    async getById(id) {
        return axios.get(`${getApiUrl}/auth/user/${id}`)
    },

    getAccessToken() {
        return window.localStorage.getItem("accessToken");
    },
}