import cn from "classnames";
import "./style.scss";

const RemoveButton = ({ className, onClick }) => (
  <button className={cn(className, "remove-button")} onClick={onClick} />
);

export default RemoveButton;
