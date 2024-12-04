import axios from 'axios';
import { getApi } from './utils';
import { Dish } from './types';

export async function getItemByKeyword(keyword: string) {
  return await axios.get(getApi(`/api/dishes/search?q=${keyword}`));
}

export async function getItemByFilters(category_id?: number, minPrice?: number, maxPrice?: number, minCalo?: number, maxCalo?: number) {
  return await axios.post(getApi(`/dish`), { category_id, minPrice, maxPrice, minCalo, maxCalo });
}

export async function getAllItem() {
  return await axios.get(getApi(`/api/dishes`));
}
