import React, { Component } from "react";
import Container from "./components/Container";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";
import fetchImg from "./services/Pixabay";
// import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    query: "",
    page: 1,
    gallery: [],
    loading: false,
    showModal: false, // модалка открывается по state того компонента который хочет его открыть
    largeImageURL: "",
    alt: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.getImgs();
    }
  }

  handleSubmit = (search) => {
    if (this.state.query === search) {
      return;
    }

    this.setState({
      query: search,
      page: 1,
      gallery: [],
    });
  };

  getImgs = () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    fetchImg({ query, page })
      .then((gallery) => {
        if (gallery.length === 0) {
          alert(`Sorry! ${query} is not found`);
        }
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...gallery],
          page: prevState.page + 1,
        }));
        this.scrollPageDown();
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  scrollPageDown = () => {
    // setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    // }, 600);
  };

  toggleModal = () => {
    // метод открытия/закрытия модального окна
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setImgInfo = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  render() {
    const { gallery, showModal, largeImageURL, alt, loading, error } =
      this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {error && <p>Whoops, something went wrong.</p>}
        {loading && (
          <Loader
            className="Loader"
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={2000}
          />
        )}
        <ImageGallery gallery={gallery} onSetImgInfo={this.setImgInfo} />
        {gallery.length > 0 && !loading && <Button onLoadMore={this.getImgs} />}
        {showModal && ( // если showModal = true, рендерим модалку
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={alt} width="800" height="600" />
          </Modal>
        )}
        {/* <ToastContainer /> */}
      </Container>
    );
  }
}

export default App;
