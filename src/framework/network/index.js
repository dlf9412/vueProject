import axios from 'axios';
import { baseUrl } from "./config";

let fetcher = axios.create({
    baseURL: baseUrl,
    // baseURL: 'http://10.17.8.18:8009',
    withCredentials: true,
    // transformRequest: [function (data) {
    //   if (userInfo && data && !data.NOUSERINFO) {
    //     data.accessToken = userInfo.accessToken
    //   }
    //   return JSON.stringify(data)
    // }],
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    //   'accessToken': userInfo && userInfo.accessToken
    // }
})

fetcher.interceptors.request.use(function(config) {
    // const cookies = cookie.getCookies()
    config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With',
        // 'X-Powered-By': ' 3.2.1'
        //   // 'ssotoken': cookies.ssotoken,
        //   // 'ssouid': cookies.ssouid,
    }
    return config
}, function(error) {
    return Promise.reject(error)
})

fetcher.interceptors.response.use(function(response) {
    // if (response.data.code === 89001 || response.data.code === 81001 || response.data.code === 2) {
    //   const d = new Date()
    //   d.setTime(d.getTime() - 1)
    //   document.cookie = 'ssotoken=; expires=' + d.toUTCString()
    //   document.cookie = 'ssouid=; expires=' + d.toUTCString()
    //   location.href = ssoLoginUrl
    // }
    return response.data
}, function(error) {
    // if (error.response.status === 504) {
      alert(error.response.statusText);
    // }
    return Promise.reject(error)
})

export default fetcher
