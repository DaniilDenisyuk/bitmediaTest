import "./style.scss";

import cn from "classnames";
import Button from "../../components/Button";

import "./style.scss";

export const ItemCard = ({
  children,
  className,
  item,
  onCardClick,
  onToCartClick,
}) => (
  <section onClick={onCardClick} className={cn(className, "item-card")}>
    <div className="item-card__img">
      <img src={`http://${item.imgs[0]}`} alt={item.name} />
    </div>
    <div className="item-card__wrapper">
      <h2 className="item-card__name">{item.name}</h2>
      <p className="item-card__info">
        {item.description || (
          <>
            <span>{item.size}</span>
            <span>{item.energy}</span>
          </>
        )}
      </p>
      <div className="item-card__row">
        <p className="item-card__price">{item.price} грн.</p>
        <Button
          className="item-card__add-button"
          rounded
          secondary
          onClick={(e) => {
            e.stopPropagation();
            onToCartClick();
          }}
        >
          В кошик
        </Button>
      </div>
    </div>
    {children}
  </section>
);
