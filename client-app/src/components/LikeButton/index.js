import cn from "classnames";
import "./style.scss";

const LikeButton = ({ className, onClick, active }) => (
  <button
    className={cn(className, "like-button", { "like-button--active": active })}
    onClick={onClick}
  >
    <i className="like-button__heart" />
  </button>
);

export default LikeButton;
