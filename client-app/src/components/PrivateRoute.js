import { Route, Redirect } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUserRole } from "../common/selectors";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const role = useSelector(getUserRole);
  // if (isLoggingIn) {
  //   return <Loading message="Вход" />;
  // }
  if (isLoggedIn) {
    if (roles && roles.indexOf(role) === -1) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
