import axios, {
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig, } from 'axios'
import Cookie from 'js-cookie'

import { MOCKARO_KEY, Env } from '@config/constants'

function createAxiosInstance(baseURL: string) {
  const instance = axios.create({
    baseURL,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  // Intercept each request to add the token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = Cookie.get('loginToken')
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        
        // Add the API key for development
        if (Env === 'development') {
          config.headers['X-API-Key'] = MOCKARO_KEY
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === HttpStatusCode.Ok) {
          if(response?.data?.token){
            Cookie.set('loginToken', response.data?.token)
          }
        return response.data
      }
      return Promise.reject(response)
    },
    (error) => {
      if (error.response) {
        console.error('API Error:', error)
        return Promise.reject(error.response.data)
      }
      return Promise.reject(error)
    }
  )

  return instance
}

// CRUD Operations
export const apiService = {
  get: async (baseURL: string, endpoint: string,  params?: object) => {
    try {
      const axiosInstance = createAxiosInstance(baseURL)
      return await axiosInstance.get(endpoint, { params })
    } catch (error) {
      console.error('GET request error:', error)
      throw error
    }
  },

  post: async (baseURL: string, endpoint: string,  data: object) => {
    try {
      const axiosInstance = createAxiosInstance(baseURL)
      return await axiosInstance.post(endpoint, data)
    } catch (error) {
      console.error('POST request error:', error)
      throw error
    }
  },

  put: async (baseURL: string, endpoint: string,  data: object) => {
    try {
      const axiosInstance = createAxiosInstance(baseURL)
      return await axiosInstance.put(endpoint, data)
    } catch (error) {
      console.error('PUT request error:', error)
      throw error
    }
  },

  delete: async (baseURL: string, endpoint: string) => {
    try {
      const axiosInstance = createAxiosInstance(baseURL)
      return await axiosInstance.delete(endpoint)
    } catch (error) {
      console.error('DELETE request error:', error)
      throw error
    }
  },
}
