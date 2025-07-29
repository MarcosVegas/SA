import axios from 'axios';
import { URL_UPDATE_ASEGURADO } from '../libs/Constants.js';

export const requestUpdate = async (dataUpdate) => {
    const response = await axios.post(URL_UPDATE_ASEGURADO, {dataUpdate});
    return response.data;
};