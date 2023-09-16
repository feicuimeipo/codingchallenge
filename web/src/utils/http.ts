import axios from 'axios';
import {message} from "antd";



const axiosHttp = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
    timeout: 50000,
    headers: {
        // 'X-Requested-With':'XMLHttpRequest',
        // 'Content-Type': 'application/json; charset=UTF-8'
    }
})

axiosHttp.interceptors.request.use(
    config => {
        // if (getToken()) {
        //     config.headers['Authorization'] = 'Bearer ' + getToken()
        // }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

axiosHttp.interceptors.response.use(
    (response) => {
        if (response.data){
            if (response.data.code && response.data.code !== 0) {
                // 根据业务需求修改这里的提示方式，比如使用Message组件提示错误信息。
                return Promise.reject(response.data.message);
            }
            return response.data;
        }
        return response
  },
    error => {
        if(error.response.status>400){
            return Promise.reject(error.data.message?error.data.message:error.data);
        }
        //console.log("response.error--"+JSON.stringify(error))
        return Promise.reject(error);
    }
)


export default axiosHttp
