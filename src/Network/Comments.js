import { getApiUrl } from '../Utils/Config/getApiUrl';
import axios from 'axios';

export const CommentApi = {

    async getCommentsByProductId(productId) {

        return axios.get(`${getApiUrl}/comments/product/${productId}`);
    },

    async getCommentsByUser() {
        return axios.get(`${getApiUrl}/comments/user`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async postNewComment(comment, productId) {
        return axios.post(`${getApiUrl}/comments/product/${productId}`, comment, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async deleteComment(id) {
        return axios.delete(`${getApiUrl}/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async editComment(id, data) {
        return axios.put(`${getApiUrl}/comments/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    }
}