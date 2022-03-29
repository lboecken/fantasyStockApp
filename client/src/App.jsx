import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FontStyle } from '@GlobalStyles';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoginManager();
  const CONTEXT = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    API_URL: import.meta.env.VITE_API_URL,
  };
  return (
    <>
      <FontStyle />
      <Outlet context={CONTEXT} />
    </>
  );
}

export default App;

const useLoginManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn };
};
