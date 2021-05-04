import axios from 'axios'
import {DETECTION_API_BASE_URL} from './apiService'

const REGISTER_STREAM_URL = 'stream/register'
const LIST_ALL_STREAMS_URL = 'stream/all'

export const registerStream = (formData) => {
    const token = localStorage.getItem('token')
    return axios.post(`${DETECTION_API_BASE_URL}/${REGISTER_STREAM_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
    })
}

export const getAllStreams = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${DETECTION_API_BASE_URL}/${LIST_ALL_STREAMS_URL}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
}