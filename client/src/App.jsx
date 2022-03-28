import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FontStyle } from '@GlobalStyles';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoginManager();
  return (
    <>
      <FontStyle />
      <Outlet
        context={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}
      />
    </>
  );
}

export default App;

const useLoginManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn };
};
