import axios from 'axios';

async function makePostReq(url, request, header) {
  const API_URL = import.meta.env.VITE_API_URL + url;
  const response = await axios
    .post(API_URL, request)
    .catch((error) => error.response);
  return response;
}

async function makeGetReq(url, request, header) {
  const response = await axios
    .get(url, request)
    .catch((error) => error.response);
  return response;
}
export { makePostReq, makeGetReq };
