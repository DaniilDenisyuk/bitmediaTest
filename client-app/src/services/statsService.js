import { API_URL } from "./helpers/apiUrl";
import handleResponse from "./helpers/handleResponse";

export const statsService = (function () {
  const getUsers = async (amount = 250, direction = "forward", startId = 1) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    const url = new URL("api/stats/users", API_URL);
    url.search = new URLSearchParams({
      startId,
      amount,
      direction,
    }).toString();
    return fetch(url.toString(), requestOptions).then(handleResponse);
  };

  const getUserStats = async (userId, from, to) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const url = new URL(`api/stats/user/${userId}`, API_URL);
    url.search = new URLSearchParams({
      from,
      to,
    }).toString();
    return fetch(url.toString(), requestOptions).then(handleResponse);
  };
  return { getUsers, getUserStats };
})();

export default statsService;
