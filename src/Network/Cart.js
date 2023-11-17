import { getApiUrl } from '../Utils/Config/getApiUrl';
import axios from 'axios';

export const CartApi = {

    async getList(id) {

        return axios.get(`${getApiUrl}/cart/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async getCartByBillId(billId) {

        return axios.get(`${getApiUrl}/cart/bill/${billId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async addBook(data) {

        return axios.post(`${getApiUrl}/cart`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async removeBook(id) {
        return axios.delete(`${getApiUrl}/cart/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });

    },

    async changeQuantity(data) {
        return axios.put(`${getApiUrl}/cart/fix/quantity`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async updateCart(data, id) {
        return axios.put(`${getApiUrl}/cart/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async buyCart(data) {
        return axios.put(`${getApiUrl}/cart`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    },
}