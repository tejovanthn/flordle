import React from "react";
import { createPortal } from "react-dom";

export interface IModal {
  isOpen: boolean;
  children: JSX.Element;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose }: IModal) => {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    window.onclick = function (event:MouseEvent) {
      if (event.target === modalRef.current) {
        onClose();
      }
    };
  }, []);

  if (!isOpen) return null;
  const domNode = document.getElementById("portal-root");
  if (domNode) {
    return createPortal(
      <div
        id="myModal"
        className="modal"
        style={{ display: isOpen ? "block" : "none" }}
        ref={modalRef}
      >
        <div className="modal-content">
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
          {children}
        </div>
      </div>,
      domNode
    );
  }
  return null;
};

export default Modal;
