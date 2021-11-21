import axios from 'axios';
import storageService from '../service/storageService';

// 这里的问题：
// 1、当示例创建成功过后，headers就不会变了
const service = axios.create({
  // process是node.js维护的全局变量,他描述了当前node.js的进程信息
  // process里面的env变量保存着当前node进程里面所有的环境变量
  // 在vue项目中,环境变量必须以VUE_APP开头
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 5,
});

// Add a request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  // modify headers
  Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` });
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default service;
