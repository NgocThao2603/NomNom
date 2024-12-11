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
