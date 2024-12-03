import axios from 'axios';
import { getApi } from './utils';

export async function getItemByKeyword(keyword: string) {
  return await axios.get(getApi(`/api/dishes/search?q=${keyword}`));
}
