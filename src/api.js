import axios from 'axios'


function Request(url, params) {
    return axios({
        baseURL: 'http://localhost:8080',
        url: url,
        method: "get",
        method: params.method,
        data: params.data,
        headers: params.headers
    })
}

export default {
    Request: Request
}