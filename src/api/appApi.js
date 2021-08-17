import { HttpClient } from './lib/httpClient';


const TYPE = process.env.NODE_ENV;
const BASE_URL_LIVE = process.env.REACT_APP_BASE_URL;
const BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;
const BASE_PRODUCT_VERSION = process.env.REACT_APP_VERSION;
const BASE_URL = TYPE === "development" ? BASE_URL_DEV : BASE_URL_LIVE;

const getAllPage = (token) => {
    return HttpClient.get(`${BASE_URL}/api/get/fanpage?token=` + token);
}

const getAllData = (params, page) => {
    return HttpClient.post(`${BASE_URL}/api/v1/filterAllData?page=` + page, params);
}

const getAllColumn = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/getColumnTable`);
}

const saveCollection = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/saveCollection`, params);
}

const getCollection = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/getCollection`);
}

const getDetailCollection = (id = "") => {
    return HttpClient.get(`${BASE_URL}/api/v1/detailCollection?_id=` + id);
}

const getLogData = (id = "") => {
    return HttpClient.get(`${BASE_URL}/api/v1/GetLog?id=` + id);
}

const createLogData = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/CreateLog`, params);
}


const AppAPI = {
    BASE_URL,
    BASE_PRODUCT_VERSION,
    getAllData,
    getAllColumn,
    saveCollection,
    getCollection,
    getDetailCollection,
    getLogData,
    createLogData
};

export { AppAPI };
