import "./style.scss";

const Confirm = ({ message, onConfirm, onDecline }) => (
  <div className="confirm">
    <p className="confirm__message">{message}</p>
    <div className="confirm__buttons">
      <button className="confirm__button" onClick={onConfirm}>
        Подтвердить
      </button>
      <button className="confirm__button" onClick={onDecline}>
        Отмена
      </button>
    </div>
  </div>
);

export default Confirm;
