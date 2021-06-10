import cn from "classnames";
import "./style.scss";

const Loading = ({ className, message }) => (
  <p className={cn(className, "loading")}>
    {message}
    <span className="loading__dots"></span>
  </p>
);

export default Loading;
