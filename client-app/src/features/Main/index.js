import "./style.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Home from "../Home";
import StatsRouter from "../stats/StatsRouter";

const Main = () => {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          path="/stats"
          children={
            <>
              <Header />
              <StatsRouter />
              <Footer />
            </>
          }
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Main;
