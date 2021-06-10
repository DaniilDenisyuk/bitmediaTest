export const getStatsState = (store) => store.stats;
export const getStatUsersId = (store) => getStatsState(store).usersId;
export const getUserStats = (userId) => (store) => {
  const stats = getStatsState(store).list;
  const index = stats.findIndex((stat) => stat.id === userId);
  return index >= 0 ? stats[index] : null;
};
