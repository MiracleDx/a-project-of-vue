'use strict'

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import router from '../router'

axios.interceptors.request.use(
  config => {    // 这里的config包含每次请求的内容
    // 判断localStorage中是否存在token
    const token = localStorage.getItem('token');
    if (token) {
      //  存在将token写入 request header
      config.headers.common['Authorization'] = 'yangxl ' + token;
  }
  console.log(config)
  return config;
},
  err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(
  response => {
    return response
},
  error => {
    if (error.response.status === 401) {
      Message.warning('登录失效，请重新登录').then((val) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        localStorage.removeItem('mobile');
      }).catch(() => {
        console.log('cancel');
      });
    } else if (error.response.status === 403) {
      Message.warning('没有访问权限')
    } else {
      Message.error('系统错误，请联系管理员');
    }
    return Promise.reject(error);
});

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
    response.status === 400)) {
    return response;
  }
  if (response.status === 401) {
    Message.warning('登录失效，请重新登录').then((val) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('mobile');
    }).catch(() => {
      console.log('cancel');
    });
  } else if (response.status === 403) {
    Message.warning('没有访问权限')
  } else {
    Message.error('系统错误，请联系管理员');
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
 /* if (res.status === -404) {
    console.log(res.msg);
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg);
  }*/

  /*if (res.status === 401) {
    Message.warning('登录失效，请重新登录').then((val) => {
    }).catch(() => {
      console.log('cancel');
    });
  } else if (res.status === 403) {
    Message.warning('没有访问权限')
  } else {
    Message.error('系统错误，请联系管理员');
  }*/
  return res
}
// 请求方式的配置
export default {
  post (url, data) {  //  post
    return axios({
      method: 'post',
      baseURL: 'http://127.0.0.1:8180/',
      url,
      data: JSON.stringify(data),
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Content-Type': 'application/json;charset=utf-8;',
        //'Content-Type':'multipart/form-data'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {  // get
    return axios({
      method: 'get',
      baseURL: 'http://127.0.0.1:8180/',
      url,
      params, // get 请求时带的参数
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put (url, data) {  // put
    return axios({
      method: 'put',
      baseURL: 'http://127.0.0.1:8180/',
      url,
      data: JSON.stringify(data),
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Content-Type': 'application/json;charset=utf-8',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  delete (url, params) {  // delete
    return axios({
      method: 'delete',
      baseURL: 'http://127.0.0.1:8180/',
      url,
      params, // get 请求时带的参数
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
