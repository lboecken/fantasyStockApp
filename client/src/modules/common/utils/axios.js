import axios from 'axios';

async function makePostReq(url, config) {
  const API_URL = import.meta.env.VITE_API_URL + url;
  const response = await axios
    .post(API_URL, config)
    .catch((error) => error.response);
  return response;
}

async function makeGetReq(url, config) {
  const API_URL = import.meta.env.VITE_API_URL + url;
  const response = await axios
    .get(API_URL, config)
    .catch((error) => error.response);
  return response;
}
export { makePostReq, makeGetReq };
