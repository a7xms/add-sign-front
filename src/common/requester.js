import axios from "axios";


export const BASE_URL = "http://localhost:8080/api/v1";


axios.defaults.responseType = "json";
axios.defaults.timeout = 30000;

async function request(method, url, data, params, contentType) {
    const token = localStorage.getItem('token');
    data = data || {};
    let headers = {"Content-Type": contentType, 'Access-Control-Allow-Origin': '*'};
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    try {
        return await axios.request({method, url, data, params, headers});
    } catch (error) {
        if(error.response) {
            if(error.response.status === 401) {
                window.location.href = "/signin";
            }
        }
        return Promise.reject(error);
    }
}

const requester = {
    get: function (url, params = null, contentType = "application/json") {
        return request("get", BASE_URL + url, null, params, contentType);
    },
    post: function (url, data = null, contentType = "application/json") {
        return request("post", BASE_URL + url, data, null, contentType);
    },
    put: function (url, data = null, params = null, contentType = "application/json") {
        return request("put", BASE_URL + url, data, params, contentType);
    },
    delete: function (url, params, contentType = "application/json") {
        return request("delete", BASE_URL + url, null, params, contentType);
    }
};

export default requester;
