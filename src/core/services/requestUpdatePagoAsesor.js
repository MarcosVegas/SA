import axios from 'axios';

export const requestUpdatePagoAsesor = async (dataUpdate) => {

    const URL = "https://prod-91.westus.logic.azure.com:443/workflows/a9a1c7580c324b9cb69937b8d2a1cbab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u9q-c61spN0m3QHJsAjnzq6MUKltn_8FNvXsN1nXgl0";
    const response = await axios.post(URL, {dataUpdate});

    return response.data;
};