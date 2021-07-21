import React, { useCallback, useEffect, useState } from "react";
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

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState(null);
  const [error, setError] = useState(null);

  const getImgs = useCallback(() => {
    setLoading(true);

    fetchImg({ query, page })
      .then((gallery) => {
        if (gallery.length === 0) {
          alert(`Sorry! ${query} is not found`);
        }
        setGallery((prevGallery) => [...prevGallery, ...gallery]);
        scrollPageDown();
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page, query]);

  useEffect(() => {
    if (!query) return;
    getImgs();
  }, [query, getImgs]);

  const handleSubmit = (search) => {
    if (query === search) {
      return;
    }
    setQuery(search);
    setPage(1);
    setGallery([]);
    setLoading(true);
    setError(null);
    setShowModal(false);
  };

  const scrollPageDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setImgInfo = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setAlt(tags);
    toggleModal();
  };
  const LoadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
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
      <ImageGallery gallery={gallery} onSetImgInfo={setImgInfo} />
      {gallery.length >= 6 && !loading && <Button onLoadMore={LoadMore} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} alt={alt} onClose={toggleModal} />
      )}
    </Container>
  );
}
