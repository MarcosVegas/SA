import axios from 'axios';

export const requestUpdateMascotas = async (dataUpdate) => {

    const URL = "https://prod-13.westus.logic.azure.com:443/workflows/865211024959440bb451a5fd00a89581/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KaC3J3qvw1W0yVtnob8MwUKAbmJv7aQZgOyfUok8Nk8";
    const response = await axios.post(URL, {dataUpdate});

    return response.data;
};