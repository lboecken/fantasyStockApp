
import { Outlet } from 'react-router-dom';

import { FontStyle } from '@Theming';

function App() {
  return (
    <>
      <FontStyle />
      <Outlet />
    </>
  );
}

export default App;

