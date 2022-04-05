import { Outlet } from 'react-router-dom';
import { FontStyle } from '@GlobalStyles';

import { useLoginManager, useBearerToken } from '@Hooks';
function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoginManager();
  const { bearerToken, setBearerToken } = useBearerToken();

  const CONTEXT = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    API_URL: import.meta.env.VITE_API_URL,
    bearerToken: bearerToken,
    setBearerToken: setBearerToken,
  };
  return (
    <>
      <FontStyle />
      <Outlet context={CONTEXT} />
    </>
  );
}

export default App;
