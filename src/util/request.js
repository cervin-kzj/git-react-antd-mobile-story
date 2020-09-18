import axios from 'axios'
import qs from "qs"
import { conf } from "./config"

// 请求拦截
axios.interceptors.request.use((config) => {
    if (config.method.toUpperCase() == "POST") {
        config.data = qs.stringify({
            showapi_appid: conf.appid,
            showapi_sign: conf.sign,
            ...config.data
        })

    }
    if (config.method.toUpperCase() == "GET") {
        config.params = {
            showapi_appid: conf.appid,
            showapi_sign: conf.sign,
            ...config.params
        }
    }
    return config;
});
// 响应拦截
axios.interceptors.response.use(res => {
    console.log("响应拦截:" + res.config.url);
    console.log(res);
    return res;
});

const baseUrl = ""

// 故事分类
export const requestStoryType = (data = {}) => {
    return axios({
        url: baseUrl + "/1700-1",
        method: "get",
        data
    })
};

// 故事列表
export const requestStoryList=(data = {})=>{
    return axios({
        url: baseUrl + "/1700-2",
        method: "post",
        data
    })
}

// 故事详情
export const requestStoryDetail=(data = {})=>{
    return axios({
        url: baseUrl + "/1700-3",
        method: "post",
        data
    })
}