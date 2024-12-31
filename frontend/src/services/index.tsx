import axios from 'axios';
import { getApi } from './utils';
import './axiosInterceptor';

export async function getItemByKeyword(keyword: string) {
  return await axios.get(getApi(`/api/dishes/search?q=${keyword}`));
}

export async function getItemByFilters(category_id?: number, minPrice?: number, maxPrice?: number, minCalo?: number, maxCalo?: number) {
  return await axios.post(getApi(`/dish`), { category_id, minPrice, maxPrice, minCalo, maxCalo });
}

export async function getAllItem() {
  return await axios.get(getApi(`/api/dishes`));
}

export async function getDishById(id: string | undefined) {
  return await axios.get(getApi(`/api/dishes/${id}`));
}

export async function getAverageRating(id: string | undefined) {
  return await axios.get(getApi(`/api/dishes/rate/${id}`));
}

export async function getFeedback(id: string | undefined) {
  return await axios.get(getApi(`/api/dishes/feedback/${id}`));
}

export async function deleteDishFromCart(dish_id: string) {
  return await axios.post(getApi(`/cart`), { dish_id }, { withCredentials: true });
}

export async function addDishToCart(dish_id: number, quantity: number) {
  return await axios.post(getApi('/cart'), { dish_id, quantity }, { withCredentials: true });
}

export async function getCart() {
  const response = await axios.get(getApi(`/cart`), { withCredentials: true });
  return response.data.data[0];
}

export async function placeOrder(dish_ids: number[], quantities: number[]) {
  return await axios.post(getApi('/order/place'), { dish_ids, quantities }, { withCredentials: true });
}

export async function deleteCartItem(id: number) {
  return await axios.delete(getApi(`/cart?dish_id=${id}`), { withCredentials: true });
}

export async function getOrders() {
  return await axios.get(getApi(`/order/`), { withCredentials: true });
}

export async function confirmOrder(order_ids: number[]) {
  return await axios.post(getApi(`/order/confirm`), { order_ids }, { withCredentials: true });
}

export async function getOrdersHistory() {
  return await axios.get(getApi(`/order/history`), { withCredentials: true });
}

export async function postRating(body: any) {
  return await axios.post(getApi('/order/rate'), body, { withCredentials: true });
}

export async function login(email: string, password: string) {
  return await axios.post(getApi('/user/login'), { email, password }, { withCredentials: true });
}

export async function signup(email: string, username: string, password: string) {
  return await axios.post(getApi('/user/signup'), { email, username, password });
}

export async function logout() {
  return await axios.post(getApi('/user/logout'), {}, { withCredentials: true });
}

export const refreshAccessToken = async () => {
  return await axios.post(getApi(`/user/refresh_token`), {}, { withCredentials: true });
};

export async function getUserInfo() {
  return await axios.get(getApi(`/api/user`), { withCredentials: true });
}

export async function updateUserInfo(body: any) {
  return await axios.put(getApi(`/api/user`), body, { withCredentials: true });
}

export async function updateAvatar(file: any) {
  return await axios.post(getApi(`/api/files`), file, { withCredentials: true });
}
