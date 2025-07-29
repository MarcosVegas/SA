import axios from 'axios';
import { URL_SEARCH_COLECTIVA } from '../libs/Constants.js';

export const requestSearchColectiva = async (searchData) => {
    const response = await axios.post(URL_SEARCH_COLECTIVA, {searchData});
    return response.data;
};