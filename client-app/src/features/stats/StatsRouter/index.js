import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UserStats from "../UserStats";
import UsersStats from "../UsersStats";
import { statsActions } from "../statsSlice";

const baseRowsCount = 50;
const basePagesCount = 5;

const Main = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statsActions.getUsers(0, baseRowsCount * basePagesCount));
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path={path} children={<UsersStats />} />
      <Route exact path={`${path}/user/:id`} children={<UserStats />} />
      <Redirect to={path} />
    </Switch>
  );
};

export default Main;
