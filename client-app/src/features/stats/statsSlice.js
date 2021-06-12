import statsService from "../../services/statsService";

const statsState = {
  isUsersLoading: false,
  isUsersSucceeded: false,
  isUsersFailed: false,
  cursor: {
    prevEl: null,
    nextEl: 1,
  },
  users: [],
  usersId: [],
  isStatsLoading: false,
  isStatsSucceeded: false,
  isStatsFailed: false,
  usersStats: {},
};

export const statsConstants = {
  getUsersRequest: "stats/getUsersRequest",
  getUsersSucceeded: "stats/getSucceeded",
  getUsersFailed: "stats/getFailed",
  getUserStatsRequest: "stats/getUserStatsRequest",
  getUserStatsSucceeded: "stats/getUserStatsSucceeded",
  getUserStatsFailed: "stats/getUserStatsFailed",
};

export const statsReducer = (state = statsState, action) => {
  switch (action.type) {
    case statsConstants.getUsersRequest: {
      return {
        ...state,
        isUsersLoading: true,
      };
    }
    case statsConstants.getUsersSucceeded: {
      const { cursor, users } = action.payload;
      return {
        ...state,
        isUsersLoading: false,
        isUsersFailed: false,
        isUsersSucceeded: true,
        usersId: users.map((user) => user.id),
        users,
        cursor,
      };
    }
    case statsConstants.getUsersFailed: {
      return {
        ...state,
        isUsersLoading: false,
        isUsersFailed: true,
        isUsersSucceeded: false,
      };
    }
    case statsConstants.getUserStatsRequest: {
      return { ...state, isUserStatsLoading: true };
    }
    case statsConstants.getUserStatsSucceeded: {
      const { userId, userStats } = action.payload;
      return {
        ...state,
        isUserStatsLoading: false,
        isUserStatsFailed: false,
        isUserStatsSucceeded: true,
        usersStats: { ...state.userStats, [userId]: userStats },
      };
    }
    case statsConstants.getUserStatsFailed: {
      return {
        ...state,
        isUserStatsLoading: false,
        isUserStatsFailed: true,
        isUserStatsSucceeded: false,
      };
    }
    default:
      return state;
  }
};

const getUsers = (amount, direction, startId) => {
  const request = () => ({
    type: statsConstants.getUsersRequest,
  });
  const success = ({ cursor, users }) => ({
    type: statsConstants.getUsersSucceeded,
    payload: { cursor, users },
  });
  const failure = () => ({
    type: statsConstants.getUsersFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return statsService
      .getUsers(amount, direction, startId)
      .then((res) => dispatch(success(res)))
      .catch(() => dispatch(failure));
  };
};

const getUserStats = (userId, from, to) => {
  const request = () => ({
    type: statsConstants.getUserStatsRequest,
  });
  const success = (userStats) => ({
    type: statsConstants.getUserStatsSucceeded,
    payload: { userId, userStats },
  });
  const failure = () => ({
    type: statsConstants.getUserStatsFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return statsService
      .getUserStats(userId, from, to)
      .then((userStats) => dispatch(success(userStats)))
      .catch(() => dispatch(failure));
  };
};

export const statsActions = {
  getUsers,
  getUserStats,
};
