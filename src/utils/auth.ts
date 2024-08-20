import Cookies from "js-cookie";
const TokenKey: string = "satoken";

export const getByKey = (key = TokenKey) => {
  return Cookies.get(key);
};

export const setByKey = (key: string, value: string) => {
  return Cookies.set(key, value);
};

export const removeByKey = (key = TokenKey) => {
  return Cookies.remove(key);
};
