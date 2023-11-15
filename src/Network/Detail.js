import { getApiUrl } from '../Utils/Config/getApiUrl';
import axios from 'axios';

export const Detail = {

    async getDetailProduct(id) {

        return axios.get(`${getApiUrl}/detail/${id}`);
    },

    async updatedDetailProduct(data, id) {

        return axios.put(`${getApiUrl}/detail/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        });
    },

    async updateRatingDetail(id) {
        return axios.put(`${getApiUrl}/detail/rating/${id}`, 1, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        });
    }
}