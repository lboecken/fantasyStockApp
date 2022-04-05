import { useState } from 'react';

export function useLoginManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn };
}
