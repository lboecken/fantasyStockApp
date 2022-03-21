import { Outlet } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import colors from './theming/colors';
import FontStyle from './theming/fonts/fonts';

function App() {
  return (
    <>
      {/* <ThemeProvider theme={colors}> */}
      <FontStyle />
      <Outlet />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
