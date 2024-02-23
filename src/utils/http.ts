//引入我们下载好的 Axios 库
import axios from 'axios';
import { notification } from 'antd';

//可以使用自定义配置新建一个 axios 实例
const service = axios.create({
  //请求路径
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: import.meta.env.VITE_REACT_APP_BASEURL,

  // 覆写库的超时默认值
  // 现在，在超时前，所有请求都会等待 5 秒
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // config.headers.set('X-Requested-With', 'XMLHttpRequest');
    const token = localStorage.getItem('access_token') || '';
    if (token) config.headers.set('Authorization', `Bearer ${token}`);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    const { status, data } = res;

    if (status !== 200) {
      return Promise.reject('程序异常');
    }

    if (data.code === 401 && data.msg == '未登录') {
      localStorage.removeItem('ssoToken');
      notification.error({ message: '请重新登录' });
      if (location.pathname !== '/login') {
        location.href = '/login';
      }
    }
    // 对响应数据做点什么
    return res;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const http = {
  get(url: any, params = {}, options = {}) {
    return service({
      url,
      method: 'get',
      params,
      ...options,
    });
  },
  post(url: any, data = {}, options = {}) {
    return service({
      url,
      method: 'post',
      data,
      ...options,
    });
  },
  delete(url: any, params = {}, options = {}) {
    return service({
      url,
      method: 'delete',
      params,
      ...options,
    });
  },
};

export default http;
