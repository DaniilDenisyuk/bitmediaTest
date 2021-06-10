import cn from "classnames";
import "./style.scss";

const FormGroup = ({ className, label, inputProps, tip, error }) => {
  const input =
    inputProps && inputProps.type === "radio" ? (
      <label className="form-group__radio">
        <input {...inputProps} className="form-group__radio-input" />
        <span className="form-group__radio-btn" />
        {label && (
          <div className="form-group__radio-label form-group__label">
            {label}
          </div>
        )}
      </label>
    ) : (
      <>
        {label && <div className="form-group__label">{label}</div>}
        <input {...inputProps} className="form-group__input" />
      </>
    );
  return (
    <div
      className={cn(className, "form-group", {
        "form-group--invalid": error,
      })}
    >
      {input}
      {tip && <div className="form-group__tip">{tip}</div>}
      {error && <p className="form-group__error">{error}</p>}
    </div>
  );
};

export default FormGroup;
