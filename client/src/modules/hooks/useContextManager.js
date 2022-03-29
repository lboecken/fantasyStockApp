import { useOutletContext, useNavigate } from 'react-router-dom';

export function useRedirector() {
  const navigate = useNavigate();
  return navigate;
}

export function useContextManager() {
  const { isLoggedIn, setIsLoggedIn, API_URL } = useOutletContext();
  return {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    API_URL: API_URL,
  };
}
