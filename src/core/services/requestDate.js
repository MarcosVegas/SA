import axios from 'axios';
import { URL_DATE } from '../libs/Constants.js';

export const requestDate = async (date) => {
    const response = await axios.post(URL_DATE, { date });
    return response.data;
};