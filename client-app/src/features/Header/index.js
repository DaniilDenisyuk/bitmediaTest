import cn from "classnames";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = ({ className }) => {
  return (
    <header className={cn(className, "header")}>
      <div className="header__wrapper __container">
        <Link to="/">
          <p className="header__heading">AppCo</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
