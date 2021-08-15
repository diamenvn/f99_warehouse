import { HttpClient } from './lib/httpClient';


const TYPE = process.env.NODE_ENV;
const BASE_URL_LIVE = process.env.REACT_APP_BASE_URL;
const BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;
const BASE_PRODUCT_VERSION = process.env.REACT_APP_VERSION;
const BASE_URL = TYPE === "development" ? BASE_URL_DEV : BASE_URL_LIVE;

const getAllPage = (token) => {
    return HttpClient.get(`${BASE_URL}/api/get/fanpage?token=` + token);
}

const getAllTimeKeeping = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/view_all_timekeeping`);
}

const getAllColumn = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/get_all_day_in_month`);
}

const getAllDevice = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/setting/device/get_all_list`);
}


const addDevice = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/setting/device/add`, params);
}

const addApiReciverData = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/setting/device/add_api`, params);
}

const removeDevice = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/setting/device/remove`, params);
}

const removeItemAPI = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/setting/device/remove_api`, params);
}

const getDepartment = (params) => {
    return HttpClient.get(`${BASE_URL}/api/v1/get_list_department`);
}
const createCustomer = (params) => {
    return HttpClient.post(`${BASE_URL}/api/v1/user/personnel/add`, params);
}
const getListCustomer = (params) => {
    return HttpClient.get(`${BASE_URL}/api/v1/user/personnel/company/get`);
}

const getDetailtCustomer = (params) => {
    return HttpClient.get(`${BASE_URL}/api/v1/user/personnel/detail/get?customer_id=` + params);
}

const getPrefixName = () => {
    return HttpClient.get(`${BASE_URL}/api/v1/get_prefix_name`);
}


const AppAPI = {
    BASE_URL,
    BASE_PRODUCT_VERSION,
    getAllTimeKeeping,
    getAllColumn,
    getAllDevice,
    addDevice,
    addApiReciverData,
    removeDevice,
    removeItemAPI,
    getDepartment,
    createCustomer,
    getListCustomer,
    getPrefixName,
    getDetailtCustomer
};

export { AppAPI };
