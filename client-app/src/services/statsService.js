import { API_URL } from "./helpers/apiUrl";
import handleResponse from "./helpers/handleResponse";

const getUsers = async (startIndex, amount) => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  return fetch(`${API_URL}/stats/users`, requestOptions).then(handleResponse);
};

const getUserStats = async (userId) => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(`${API_URL}/stats/user/${userId}`, requestOptions).then(
    handleResponse
  );
};

export const statsService = {
  getUsers,
  getUserStats,
};

export default statsService;
