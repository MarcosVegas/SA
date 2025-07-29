import axios from 'axios';
import { URL_SEARCH_INDIVIDUAL } from '../libs/Constants.js';

export const requestSearch = async (searchData) => {
    const response = await axios.post(URL_SEARCH_INDIVIDUAL, {searchData});
    return response.data;
};