import { DETECTION_API_BASE_URL, PLATE_SEARCH_API_BASE_URL} from './apiService'
import axios from 'axios'

const LIST_ALL_PLATES_URL = 'plate/all'
const SEARCH_PLATE_INFORMATION_URL = 'plate/search'

export const listAllPlates = (page) => {
    const token = localStorage.getItem('token')
    return axios.get(`${DETECTION_API_BASE_URL}/${LIST_ALL_PLATES_URL}?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
}

export const getPlateInformation = (plate_number) => {
  return axios.post(`${PLATE_SEARCH_API_BASE_URL}/${SEARCH_PLATE_INFORMATION_URL}/${plate_number}`)
}