import { useClickOutside, useDisableScroll } from "../../common/hooks";
import { useRef } from "react";
import cn from "classnames";
import "./style.scss";

const ModalHOC = (Component) => {
  const Modal = ({ className, onClose, ...rest }) => {
    const bodyRef = useRef();
    useClickOutside(bodyRef, onClose);
    useDisableScroll();
    return (
      <div className="fadein modal">
        <div className="modal__shadow-bg" />
        <div ref={bodyRef} className={cn(className, "modal__body")}>
          <div className="modal__close-wrapper">
            <span className="modal__close" onClick={onClose} />
          </div>
          <Component {...rest} />
        </div>
      </div>
    );
  };
  return Modal;
};

export default ModalHOC;
