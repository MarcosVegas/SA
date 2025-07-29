import axios from 'axios';
import { URL_UPDATE_PAGO_ASESOR } from '../libs/Constants.js';

export const requestUpdatePagoAsesor = async (dataUpdate) => {
    const response = await axios.post(URL_UPDATE_PAGO_ASESOR, {dataUpdate});
    return response.data;
};