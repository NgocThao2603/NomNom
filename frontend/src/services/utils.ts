import { API_ROOT } from 'src/configs/api';

export function getApi(path: string, query?: Record<string, unknown>) {
  const s = API_ROOT + path;
  let q = '';
  for (const key in query) {
    if (['string', 'number', 'boolean'].includes(typeof query[key])) {
      q += (q === '' ? '?' : '&') + `${key}=${query[key]}`;
    }
    if (Array.isArray(query[key]) && (query[key] as any).length > 0) {
      q += (q === '' ? '?' : '&') + `${key}=${(query[key] as Array<unknown>).join(',')}`;
    }
  }
  return s + q;
}
