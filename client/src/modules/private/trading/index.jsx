import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { colors } from '@GlobalStyles';
import Header from '@Common/header';
import Button from '@Common/button';
import Footer from '@Common/footer';

function TradingWrapper() {
  return (
    <>
      <ThemeProvider theme={colors}>
        <Header>
          <Button onClick={() => console.log('test')}>Search</Button>
          <Button onClick={() => console.log('test')}>Portfolio</Button>
          <Button onClick={() => console.log('test')}>Transaction</Button>
        </Header>
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default TradingWrapper ;
