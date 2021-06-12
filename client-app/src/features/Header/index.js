import cn from "classnames";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = ({ className }) => {
  return (
    <header className={cn(className, "header")}>
      <div className="header__wrapper __container">
        <p className="header__heading">AppCo</p>
        <div className="header__links">
          <Link className="header__link" to="/">
            Home
          </Link>
          <Link className="header__link" to="/stats">
            Users Statistics
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
