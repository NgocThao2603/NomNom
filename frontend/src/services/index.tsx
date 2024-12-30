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
  return await axios.post(getApi(`/cart`), { dish_id });
}

export async function addDishToCart(dish_id: number, quantity: number) {
  return await axios.post(getApi('/cart'), { dish_id, quantity });
}

export async function getCart() {
  const response = await axios.get(getApi(`/cart`));
  return response.data.data[0];
}

export async function placeOrder(user_id: number, dish_ids: number[]) {
  return await axios.post(getApi('/order/place'), { user_id, dish_ids });
}

export async function deleteCartItem(id: number) {
  return await axios.delete(getApi(`/cart?dish_id=${id}`));
}

export async function getOrders(user_id: string) {
  return await axios.get(getApi(`/order/${user_id}`));
}

export async function confirmOrder(order_ids: number[]) {
  return await axios.post(getApi(`/order/confirm`), { order_ids });
}

export async function getOrdersHistoryByUserId(user_id: number) {
  return await axios.get(getApi(`/order/history/${user_id}`));
}

export async function postRating(body: any) {
  return await axios.post(getApi('/order/rate'), body);
}

export async function login(email: string, password: string) {
  return await axios.post(getApi('/user/login'), { email, password });
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
