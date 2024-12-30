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

export async function deleteDishFromCart(user_id: string, dish_id: string) {
  return await axios.post(getApi(`/cart`), { user_id, dish_id });
}

export async function addDishToCart(user_id: string, dish_id: number, quantity: number) {
  return await axios.post(getApi('/cart'), { user_id, dish_id, quantity });
}

export async function getCartByUserId(userId: string) {
  const response = await axios.get(getApi(`/cart?user_id=${userId}`));
  return response.data.data[0];
}

export async function placeOrder(user_id: number, dish_ids: number[]) {
  return await axios.post(getApi('/order/place'), { user_id, dish_ids });
}

export async function deleteCartItem(user_id: number, id: number) {
  return await axios.delete(getApi(`/cart?user_id=${user_id}&dish_id=${id}`));
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
