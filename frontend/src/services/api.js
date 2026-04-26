
// this will work if crashed using test


// import axios from 'axios'

// // Determine API base URL based on environment
// const getBaseURL = () => {
//   // For production (Vercel) – use Railway URL
//   if (import.meta.env.PROD) {
//     return 'https://warisnamaai-production.up.railway.app/api/v1'
//   }
//   // For development (localhost) – use local backend
//   return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
// }

// const api = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Response interceptor to normalize errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.error || error.message || 'Network error'
//     return Promise.reject({ message, status: error.response?.status })
//   }
// )

// // For debugging – log which URL is being used
// console.log('API Base URL:', api.defaults.baseURL)

// export default api


import axios from 'axios'

// Use environment variable or fallback to Railway for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://warisnamaai-production.up.railway.app/api/v1'

console.log('API Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log(`Making ${config.method?.toUpperCase()} request to:`, config.baseURL + config.url)
  return config
})

// Add response interceptor to handle different response structures
api.interceptors.response.use(
  (response) => {
    console.log('Response from', response.config.url, ':', response.data)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api