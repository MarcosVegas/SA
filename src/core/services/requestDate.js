import axios from 'axios';

export const requestDate = async (date) => {

    const URL = "https://prod-30.westus.logic.azure.com:443/workflows/95fbe16eed874c439266685093585ea6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=stgtMnS6mUab5nkjM6Dgg2AszJX9-EjIo3Uk6zCR6hE";
    const response = await axios.post(URL, { date });

    return response.data;
};