import axios from 'axios'
import {DETECTION_API_BASE_URL} from './apiService'

const REGISTER_STREAM_URL = 'stream/register'
const LIST_ALL_STREAMS_URL = 'stream/all'
const DETECT_ON_IMAGE = 'detection/image'
// const DETECT_ON_VIDEO = 'detection/video'

export const registerStream = (formData) => {
    const token = localStorage.getItem('token')
    return axios.post(`${DETECTION_API_BASE_URL}/${REGISTER_STREAM_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
    })
}

export const getAllStreams = (page) => {
  const token = localStorage.getItem('token')
  return axios.get(`${DETECTION_API_BASE_URL}/${LIST_ALL_STREAMS_URL}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
}

export const detectOnImage = (stream_id) => {
  const token = localStorage.getItem('token')
  return axios.get(`${DETECTION_API_BASE_URL}/${DETECT_ON_IMAGE}`, {
    params: {
      stream_id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
})
}

// export const detectOnVideo = (stream_id) => {
//   const token = localStorage.getItem('token')
//   return axios.get(`${DETECTION_API_BASE_URL}/${DETECT_ON_VIDEO}`, {
//     params: {
//       stream_id
//     },
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
// })
// }