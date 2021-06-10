import { Link } from "react-router-dom";
import cn from "classnames";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer __container">
      <div className="footer__wrapper flex">
        <p className="flex-left">AppCo</p>
        <p className="center">All rights reserved by ThemeTags</p>
        <p className="flex-right">© Developed by Daniil Denysiuk</p>
      </div>
    </footer>
  );
};

export default Footer;
