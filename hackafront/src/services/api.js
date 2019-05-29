import axios from 'axios'

const api = axios.create({baseURL: 'http://172.22.64.71:3001/'})

export default api