import classNames from "classnames";
import "./style.scss";

function RadioButton({ children, className, name, value }) {
  const classes = classNames("radio-button", className);
  return (
    <label className={classes}>
      <input type="radio" className={classes} name={name} value={value}></input>
      <div class="radio-button__checkbox"></div>
      {children}
    </label>
  );
}

export default RadioButton;
