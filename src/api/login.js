import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     code: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/system/login',
    method: 'post',
    data: parameter
  })
}

export function phoneLogin(parameter) {
  return axios({
    url: '/system/phoneLogin',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/api/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout(logoutToken) {
  return axios({
    url: '/system/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':  logoutToken
    }
  })
}

/**
 * 第三方登录
 * @param token
 * @returns {*}
 */
export function thirdLogin(token) {
  return axios({
    url: `/thirdLogin/getLoginUser/${token}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}