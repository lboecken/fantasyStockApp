import axios from 'axios';

async function makePostReq(url, data, config) {
  console.log(url);
  const response = await axios
    .post(url, data, config)
    .catch((error) => error.response);

  return response;
}

async function makeGetReq(url, config) {
  console.log(url);
  const response = await axios
    .get(url, config)
    .catch((error) => error.response);
  return response;
}
export { makePostReq, makeGetReq };
