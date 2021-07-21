import PropTypes from "prop-types";
import b from "./Button.module.css";

const Button = ({ onLoadMore }) => (
  <button type="button" className={b.Button} onClick={() => onLoadMore()}>
    Load more
  </button>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
