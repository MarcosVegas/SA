import axios from 'axios';

export const requestSearchColectiva = async (searchData) => {

    const URL =  "https://prod-144.westus.logic.azure.com:443/workflows/ee702c799b91458f992f1949014a2631/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tiY1brGxEeD9Vcb0tGyIqA7dkKv3rPYvVmJLcejYERI";
    const response = await axios.post(URL, {searchData});

    return response.data;
};