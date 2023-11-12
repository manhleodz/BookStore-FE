import { getApiUrl } from "../Utils/Config/getApiUrl";
import axios from "axios";

export const Product = {

    async getList() {
        return axios.get(`${getApiUrl}/products/all`);
    },

    async getProduct1() {
        return axios.get(`${getApiUrl}/products/product`);
    },

    async getProduct(id) {
        return axios.get(`${getApiUrl}/products/${id}`);
    },

    async updateProduct(id, data) {
        return axios.put(`${getApiUrl}/products/product/${id}`, data);
    },

    async GetByCategory(category) { 
        return axios.get(`${getApiUrl}/products/by/${category}`);
    }
}