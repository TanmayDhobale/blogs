import axios from 'axios';

const baseUrl = 'http://localhost:5000/blogs';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
