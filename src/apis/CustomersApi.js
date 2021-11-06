import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_APP_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

export const listCustomers = (page, pageSize, filters) => {
    let apiURL = `${baseUrl}/customers?page=${page}&size=${pageSize}`;

    let contactCountryFilter = filters.find(filter => filter.columnName === 'contactCountryName')?.value;
    let contactStateFilter = filters.find(filter => filter.columnName === 'contactState')?.value;

    if (contactCountryFilter) {
        apiURL = `${apiURL}&contactCountryName=${contactCountryFilter}`
    }
    if (contactStateFilter) {
        apiURL = `${apiURL}&contactState=${contactStateFilter}`
    }
    return axiosInstance.get(apiURL);
}


