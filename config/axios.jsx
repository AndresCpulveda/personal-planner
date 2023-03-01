import axios from 'axios'

const sendAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

export default sendAxios