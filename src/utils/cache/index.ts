import { isEmpty } from 'lodash';

import { redis } from './redis';

const fetch = async <T>(key: string, fetcher: () => T, expires: number) => {
  const existing = await get(key);

  if (!isEmpty(existing)) return existing;

  return set(key, fetcher, expires);
};

const set = async <T>(key: string, fetcher: () => T, expires: number) => {
  const value = await fetcher();

  await redis.set(key, JSON.stringify(value), 'EX', expires);
  return value;
};

const get = async (key: string) => {
  const value = await redis.get(key);

  if (isEmpty(value)) return null;

  return JSON.parse(value!);
};

const del = async (keys: string[]) => {
  for (const key of keys) {
    await redis.del(key);
  }
};

const cache = { set, del, fetch };

export default cache;
