import { Outlet } from 'react-router-dom';
import FontStyle from './theming/fonts/fonts';

function App() {
  return (
    <>
      <FontStyle />
      <Outlet />
    </>
  );
}

export default App;
