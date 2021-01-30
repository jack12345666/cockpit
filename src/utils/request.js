import axios from 'axios'
import { getCookieToken } from './utils'
import { Toast } from 'vant'
import { BASEURL } from './config'

let reqConfig

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      Toast('找不到此服务，可能是在路上~')
      break;
    case 503:
      Toast('服务器开小差了~请稍后')
      break;
    default:
      Toast('网络错误')
  }

  return { data: '' }
}


const service = axios.create({
  baseURL: BASEURL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
});

/**
 *  code：’0’：请求成功；
    code：’10’：无权限，需要登录，将页面跳转至登录页；
 */

// request拦截器
service.interceptors.request.use(
  config => {
    reqConfig = config;
    config.headers['Authorization'] = encodeURIComponent(getCookieToken())
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response 拦截器
service.interceptors.response.use(
  // 请求成功
  res => {
  
    if (res.data.code == '10') {
     
        location.href = BASEURL + '/user/login.html?redirect=' + encodeURIComponent(location.href);
      
    }else if(res.data.code != '0') {
      Toast(res.data.msg)
    } 
    if (reqConfig.method === 'put') {
      return Promise.resolve(res);
    }
    return Promise.resolve(res.data);
  },
  err => {
    const { response } = err;
    if (response) {
      errorHandle(response.status, response.data);
      return Promise.reject(response.data);
    }
    return { data: '' };
  }
);

export default service;

