export const getStatsState = (store) => store.stats;
export const getStatsUsersId = (store) => getStatsState(store).usersId;
export const getStatsUser = (userId) => (store) => {
  const users = getStatsState(store).users;
  const index = users.findIndex(
    (user) => user.id.toString() === userId.toString()
  );
  return index >= 0 ? users[index] : {};
};
export const getStatsUserStats = (userId) => (store) => {
  const usersStats = getStatsState(store).usersStats;
  const index = usersStats.findIndex((stat) => stat.userId === userId);
  return index >= 0 ? usersStats[index].stats : [];
};
export const getStatsUserName = (userId) => (store) => {
  const { first_name, last_name } = getStatsUser(userId)(store);
  return `${first_name || ""} ${last_name || ""}`;
};
