import jwtDecode from "jwt-decode";
const key = "token";

const storeToken = (token) => {
  localStorage.setItem(key, token);
};

const getToken = () => {
  return localStorage.getItem(key);
};

const getUser = () => {
  const token = localStorage.getItem(key);
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  localStorage.removeItem(key);
};

export { storeToken, getToken, getUser, removeToken };
