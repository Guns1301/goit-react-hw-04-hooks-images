import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

class SearchBar extends Component {
  state = {
    query: "", // поле которое хранит значение input
  };

  handleSubmit = (e) => {
    e.preventDefault(); //что бы не перезагрузилась страница. Обязательно
    const { query } = this.state;

    if (query.trim() === "") {
      alert("Enter what you are looking");
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: "" });
  };

  handleValueChange = (e) => {
    // метод который обновляет значение input при каждом изменении
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <header className={s.SearchBar}>
          <form className={s.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.SearchForm_button}>
              <span className={s.SearchForm_button_label}>Search</span>
            </button>

            <input
              className={s.SearchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query} // устанавливает значение input взависимости от state
              onChange={this.handleValueChange} // тут привязываем метод который обновляет значение state
            />
          </form>
        </header>
      </>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
