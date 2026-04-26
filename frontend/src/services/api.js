import axios from 'axios'

// Determine API base URL based on environment
const getBaseURL = () => {
  // For production (Vercel) – use Railway URL
  if (import.meta.env.PROD) {
    return 'https://warisnamaai-production.up.railway.app/api/v1'
  }
  // For development (localhost) – use local backend
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor to normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Network error'
    return Promise.reject({ message, status: error.response?.status })
  }
)

// For debugging – log which URL is being used
console.log('API Base URL:', api.defaults.baseURL)

export default api