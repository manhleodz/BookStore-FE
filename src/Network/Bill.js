import { getApiUrl } from "../Utils/Config/getApiUrl";
import axios from "axios";

export const Bill = {

    async getBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/${userId}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            alert(err);
        });
    },

    async getBillById(id, success, failure) {

        return axios.get(`${getApiUrl}/bill/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        });
    },

    async getProcessedBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/processed/${userId}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            alert(err);
        });
    },

    async getProcessingBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/processing/${userId}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },

    async getCompletedBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/completed/${userId}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            alert(err);
        });
    },

    async getShippingBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/shipping/${userId}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            alert(err);
        });
    },

    async getCancelledBillByUser(userId, success, failure) {

        return axios.get(`${getApiUrl}/bill/cancelled/${userId}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((res) => {

            success(res.data);
        }).catch((err) => {
            alert(err);
        });
    },

    async createBill(data, success, failure) {

        return axios.post(`${getApiUrl}/bill`, data, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        })
    },

    async updateBill(data, id, success, failure) {

        return axios.put(`${getApiUrl}/bill/${id}`, data, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        })
    },

    async deleteBill(id, success, failure) {

        return axios.delete(`${getApiUrl}/bill/${id}`, {

            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        })
    },
}