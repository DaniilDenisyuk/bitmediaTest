import cn from "classnames";
import "./style.scss";

const ItemCounter = ({ className, count, onChange, min, max }) => (
  <div className={cn(className, "item-counter")}>
    <button
      className="item-counter__btn item-counter__btn--dec"
      disabled={count === min}
      onClick={() => onChange(--count)}
    />
    <p className="item-counter__value">{count}</p>
    <button
      className="item-counter__btn item-counter__btn--inc"
      disabled={count === max}
      onClick={() => onChange(++count)}
    />
  </div>
);

export default ItemCounter;
