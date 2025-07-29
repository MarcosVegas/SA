import axios from 'axios';
import { URL_UPDATE_PAGE } from '../libs/Constants.js';

export const requestUpdatePage = async (dataUpdate) => {
    const response = await axios.post(URL_UPDATE_PAGE, {dataUpdate});
    return response.data;
};