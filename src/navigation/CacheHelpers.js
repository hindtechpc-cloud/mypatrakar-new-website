// src/navigation/Navbar/CacheHelpers.js
const CACHE_MAX_AGE = 1800000; // 30 minutes

export const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_time`, Date.now().toString());
};

export const getCache = (key, maxAge = CACHE_MAX_AGE) => {
  const cached = localStorage.getItem(key);
  const cacheTime = localStorage.getItem(`${key}_time`);
  if (!cached || !cacheTime) return null;

  const age = Date.now() - parseInt(cacheTime, 10);
  if (age > maxAge) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_time`);
    return null;
  }
  return JSON.parse(cached);
};
