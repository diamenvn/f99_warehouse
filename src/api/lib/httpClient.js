import axios from 'axios';
import Cookies from 'js-cookie'
// const query = new URLSearchParams(window.location.search);
// let token = query.get('access_token');

let token = Cookies.get('_session') ? Cookies.get('_session') : "";
let obj;
let api_instance;

if (token != "") {
    obj = JSON.parse(token);
    api_instance = axios.create({
        timeout: 420000,
        withCredentials : false,
        headers: {
            'Authorization': obj.access_token
        }
    });
}else{
    api_instance = axios.create({
        timeout: 420000,
        withCredentials : false
    });
}




//Create a Http Client using Axios. Further modifications in this layer can be done later like Authorization.

const post = (url, data, config = {}) => {
    let q = api_instance.post(url, data, config);
    q.then(res => {

    }).catch(res => {
        Cookies.remove('_session')
        // window.location.href = "/";
    })
    return q;
}

const get = (url, data = {}, config = {}) => {
    let q = api_instance.get(url, data, config);
    q.then(res => {

    }).catch(res => {
        Cookies.remove('_session')
        // window.location.href = "/";
    })
    return q;
}

const put = (url, data, config = {}) => {
    return api_instance.put(url, data, config);
}

//Cannot contain a delete method - Cause delete is a keyword.

const del = (url, config = {}) => {
    return api_instance.delete(url, config);
}

//Encapsulating in a JSON object

const HttpClient = {
    post,
    get,
    put,
    delete: del
}


export {HttpClient}
