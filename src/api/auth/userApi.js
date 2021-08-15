import { AppAPI } from '../appApi';
import { HttpClient } from '../lib/httpClient';

const ver = AppAPI.BASE_PRODUCT_VERSION;

const login = (params) => {
    return HttpClient.post(`${AppAPI.BASE_URL}/api/` + ver + `/login`, params);
}

const changePass = (params) => {
    return HttpClient.post(`${AppAPI.BASE_URL}/api/` + ver + `/user/personnel/detail/changePass`, params);
}

const removeCustomer = (params) => {
    return HttpClient.post(`${AppAPI.BASE_URL}/api/` + ver + `/user/personnel/detail/remove`, params);
}



const UserAPI = {
    login,
    changePass,
    removeCustomer
};

export { UserAPI };
