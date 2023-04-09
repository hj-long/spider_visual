import axios from "axios";

let baseUrl = "http://localhost:8000";

// 创建axios实例
const Axios = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    // headers: {
    //     "Content-Type": "application/json;charset=UTF-8"
    // }
});

// request拦截器
// Axios.interceptors.request.use((config) => {
//     return config;
// })

export default Axios;