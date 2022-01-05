export const setItemLocalStorage = (key: string, value: string|null) => {
 localStorage.setItem(key, JSON.stringify(value));
  return ; 
};

