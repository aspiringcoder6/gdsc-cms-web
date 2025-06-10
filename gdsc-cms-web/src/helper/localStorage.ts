const getFromLocalStorage = (key: string, defaultValue: boolean) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return defaultValue;
  }
  return JSON.parse(storedValue) as boolean;
};

const setToLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {getFromLocalStorage, setToLocalStorage};