import cn from "classnames";
import "./style.scss";

const Footer = ({ className }) => {
  return (
    <footer className={cn(className, "footer")}>
      <div className="footer__wrapper __container">
        <p className="footer__heading">AppCo</p>
        <p className="center">All rights reserved by ThemeTags</p>
        <p className="flex-right">© Developed by Daniil Denysiuk</p>
      </div>
    </footer>
  );
};

export default Footer;
