import { DETECTION_API_BASE_URL } from './apiService'
import  axios from 'axios'
import {notifyFailure} from './notificationService'

const LOGIN_URL = 'user/login'
const REGISTER_URL = 'user/register'
const IS_AUTHENTICATED_URL = 'user/authenticated'

export const login = (email, password) => {
   return axios.post(`${DETECTION_API_BASE_URL}/${LOGIN_URL}`, {email, password})
}

export const register = (email, password, name) => {
    return axios.post(`${DETECTION_API_BASE_URL}/${REGISTER_URL}`, {email, password, name})
}

export const isAuthenticated = (token) => {
    return axios.get(`${DETECTION_API_BASE_URL}/${IS_AUTHENTICATED_URL}`, {headers: {'Authorization': `Bearer ${token}`} })
}