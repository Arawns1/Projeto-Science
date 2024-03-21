import axios from 'axios'

const DOMAIN = import.meta.env.VITE_API_DOMAIN
const PORT = import.meta.env.VITE_API_PORT

const api = axios.create({
  baseURL: `http://${DOMAIN}:${PORT}`,
})
export default api
