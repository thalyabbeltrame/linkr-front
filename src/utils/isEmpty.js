export const isEmpty = (obj, value = '') => {
  const key = Object.keys(obj).find((key) => obj[key] === value);
  if (!key) {
    return false;
  }
  return true;
};
