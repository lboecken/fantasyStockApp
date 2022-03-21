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
      <h1>More Testing</h1>
    </>
  );
}

export default App;
