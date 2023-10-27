import { getApiUrl } from '../Utils/Config/getApiUrl';
import axios from 'axios';

export const CouponApi = {

    async getList() {

        return axios.get(`${getApiUrl}/admin/coupon`);
    },
}