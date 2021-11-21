// local cache service
const PREFIX = 'ginessential_';

// define cache key
// user module
const USER_PREFIX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PREFIX}token`;
const USER_INFO = `${USER_PREFIX}info`;

// storage proxy method
const set = (key, data) => {
  localStorage.setItem(key, data);
};

// read proxy method
const get = (key) => localStorage.getItem(key);

// export proxy method and cache key
export default {
  set,
  get,
  USER_TOKEN,
  USER_INFO,
};
