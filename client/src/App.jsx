import { Outlet } from 'react-router-dom';
import FontStyle from './fonts/fonts';

function App() {
  return (
    <>
      <FontStyle />
      <Outlet />
    </>
  );
}

export default App;
