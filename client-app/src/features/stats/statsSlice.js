import { userDataService } from "../../services/statsService";
import { favoritesReducer } from "./Favorites/favoritesSlice";
import { historyReducer } from "./OrderHistory/historySlice";
import { combineReducers } from "redux";
import { authConstants } from "../auth/authSlice";

const infoState = {
  isLoading: false,
  isSucceeded: true,
  isFailed: false,
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  phone: "",
  town: "",
  street: "",
  house: "",
  door: "",
};

export const infoConstants = {
  getRequest: "user/info/getRequest",
  getSucceeded: "user/info/getSucceeded",
  getFailed: "user/info/getFailed",
  updateRequest: "user/info/updateRequest",
  updateSucceeded: "user/info/updateSucceeded",
  updateFailed: "user/info/updateFailed",
};

const infoReducer = (state = infoState, action) => {
  switch (action.type) {
    case authConstants.loginSucceeded: {
      const {
        id,
        email,
        first_name,
        last_name,
        address,
        phone,
        town,
        street,
        house,
        door,
      } = action.payload.user;
      return {
        ...state,
        id,
        email,
        first_name,
        last_name,
        address,
        phone,
        town,
        street,
        house,
        door,
      };
    }
    case infoConstants.getRequest: {
      return { isLoading: true };
    }
    case infoConstants.getSucceeded: {
      const { info } = action;
      return { isSuccededed: true, ...info };
    }
    case infoConstants.getFailed: {
      return { isFailed: true };
    }
    case infoConstants.updateRequest: {
      return { isLoading: true };
    }
    case infoConstants.updateSucceeded: {
      const { updatedInfo } = action;
      return { isSuccededed: true, ...updatedInfo };
    }
    case infoConstants.updateFailed: {
      return { isFailed: true };
    }
    default:
      return state;
  }
};

const getUserInfo = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const updateUserInfo = (token, fields) => {
  const request = () => ({
    type: infoConstants.updateRequest,
  });
  const success = (user) => ({
    type: infoConstants.updateSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.updateFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .updateUserInfo(token, fields)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

export const infoActions = {
  getUserInfo,
  updateUserInfo,
};

export const userReducer = combineReducers({
  info: infoReducer,
  orderHistory: historyReducer,
  favorites: favoritesReducer,
});
