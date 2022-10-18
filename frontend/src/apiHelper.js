import axios from 'axios'
import {
  CART_API_PATH,
  LOGIN_API_PATH,
  ORDERS_API_PATH,
  PRODUCTS_API_PATH,
  SINGLE_PRODUCT_API_PATH,
  USERS_API_PATH
} from './config'

const getConfig = token => ({
  headers: { Authorization: `Bearer ${token}` }
})

export const signup = data => axios.post(USERS_API_PATH, data)

export const login = (email, password) =>
  axios.post(LOGIN_API_PATH, { email, password })

export const getProducts = token =>
  axios.get(PRODUCTS_API_PATH, getConfig(token))

export const getSingleProduct = (token, productId) =>
  axios.get(SINGLE_PRODUCT_API_PATH, {
    ...getConfig(token),
    params: { productId }
  })

export const postCart = (token, data) =>
  axios.post(CART_API_PATH, data, getConfig(token))

export const getCart = token => axios.get(CART_API_PATH, getConfig(token))

export const postOrder = (token, data) =>
  axios.post(ORDERS_API_PATH, data, getConfig(token))

export const getOrderHistory = token =>
  axios.get(ORDERS_API_PATH, getConfig(token))
