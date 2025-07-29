import axios from 'axios';
import { URL_UPDATE_MASCOTAS } from '../libs/Constants.js';

export const requestUpdateMascotas = async (dataUpdate) => {
    const response = await axios.post(URL_UPDATE_MASCOTAS, {dataUpdate});
    return response.data;
};