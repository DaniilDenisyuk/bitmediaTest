import handleResponse from "./helpers/handleResponse";

export const statsService = (function () {
  const getUsers = async (amount = 250, direction = "forward", startId = 1) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetch(
      `/api/stats/users?${new URLSearchParams({
        startId,
        amount,
        direction,
      }).toString()}`,
      requestOptions
    ).then(handleResponse);
  };

  const getUserStats = async (userId, from, to) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetch(
      `/api/stats/user/${userId}?${new URLSearchParams({
        from,
        to,
      }).toString()}`,
      requestOptions
    ).then(handleResponse);
  };
  return { getUsers, getUserStats };
})();

export default statsService;
