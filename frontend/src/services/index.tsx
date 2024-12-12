import axios from 'axios';
import { getApi } from './utils';

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
