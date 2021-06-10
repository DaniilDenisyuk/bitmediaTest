import cn from "classnames";
import "./style.scss";

const Button = ({
  children,
  className,
  type,
  rounded,
  primary,
  secondary,
  onClick,
}) => {
  return (
    <button
      className={cn(className, "button", {
        "button--primary": primary,
        "button--secondary": secondary,
        "button--rounded": rounded,
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
