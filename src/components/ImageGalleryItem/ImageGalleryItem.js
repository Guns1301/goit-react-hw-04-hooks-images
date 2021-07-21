import PropTypes from "prop-types";
import i from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags = "",
  onSetImgInfo,
}) => {
  return (
    <li className={i.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={i.ImageGalleryItemImage}
        onClick={() => {
          onSetImgInfo({ largeImageURL, tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onSetImgInfo: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
