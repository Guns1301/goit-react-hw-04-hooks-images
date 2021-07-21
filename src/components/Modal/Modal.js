import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom"; // специальный метод
import m from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root"); //<div id="modal-root"></div>

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    // метод который снимает, размонтирует EventListener с window
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    // вызываем спец.метод , туда первым аргументом передаем разметку, а вторым - ссылку на то где эта модалка будет (id="modal-root")
    return createPortal(
      <div className={m.Overlay} onClick={this.handleClickBackdrop}>
        <div className={m.Modal}>{this.props.children}</div>
      </div>,
      modalRoot // в index.html
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
