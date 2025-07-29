import axios from 'axios';
import { URL_UPDATE_COLLECTIVELY } from '../libs/Constants.js';

export const requestUpdateCollectively = async (dataUpdate) => {
    const response = await axios.post(URL_UPDATE_COLLECTIVELY, {dataUpdate});
    return response.data;
};