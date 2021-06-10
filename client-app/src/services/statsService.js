import { API_URL } from "./helpers/apiUrl";
import tokenHeader from "./helpers/tokenHeader";
import handleResponse from "./helpers/handleResponse";

const getUserOrders = async (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data/orders`, requestOptions).then(
    handleResponse
  );
};

const getUserData = async (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data`, requestOptions).then(handleResponse);
};

const addItemToFavorites = async (token, itemId) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify({ itemId }),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data/favorites`, requestOptions).then(
    handleResponse
  );
};

const removeItemToFavorites = async (token, itemId) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
    body: JSON.stringify({ itemId }),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data/favorites`, requestOptions).then(
    handleResponse
  );
};

const getUserFavorites = async (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data/favorites`, requestOptions).then(
    handleResponse
  );
};

const updateUserInfo = async (token, updatedFields) => {
  if (!token) return;
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify(updatedFields),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data`, requestOptions).then(handleResponse);
};

const deleteUser = async (token) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/user-data`, requestOptions).then(handleResponse);
};

export const userDataService = {
  getUserFavorites,
  addItemToFavorites,
  removeItemToFavorites,
  getUserOrders,
  getUserData,
  updateUserInfo,
  deleteUser,
};
