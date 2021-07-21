import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.baseURL = "https://pixabay.com/api/";

const apiKey = "19822341-38023a333dc0ee1aeedcaef47";
const perPage = 12;

const fetchImg = ({ query = "", page = 1 }) => {
  const url = `?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return axios.get(url).then(({ data }) => data.hits);
};

fetchImg.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImg;
