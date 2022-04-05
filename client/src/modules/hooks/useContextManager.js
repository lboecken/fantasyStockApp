import { useOutletContext } from 'react-router-dom';

export function useContextManager() {
  const { isLoggedIn, setIsLoggedIn, API_URL, bearerToken, setBearerToken } =
    useOutletContext();
  return {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    API_URL: API_URL,
    bearerToken: bearerToken,
    setBearerToken: setBearerToken,
  };
}
