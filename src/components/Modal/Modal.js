import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom"; // специальный метод
import m from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root"); //<div id="modal-root"></div>

export default function Modal({ onClose, largeImageURL, alt }) {
  useEffect(() => {
    const handleKeyDown = (event) => event.code === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleBackdropClick = (event) =>
    event.currentTarget === event.target && onClose();

  return createPortal(
    <div className={m.Overlay} onClick={handleBackdropClick}>
      <div className={m.Modal}>
        <img src={largeImageURL} alt={alt} width="800" height="600" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
