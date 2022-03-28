import { Outlet, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { colors } from '@GlobalStyles';
import Header from '@Common/header';
import Button from '@Common/button';
import Footer from '@Common/footer';

import Search from '@Private/trading/search';
import Portfolio from '@Private/trading/search';
import Transactions from '@Private/trading/search';

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

function TradingRoutes() {
  return (
    <>
      <Route path='search' element={<Search />} />
      <Route path='portfolio' element={<Portfolio />} />
      <Route path='transactions' element={<Transactions />} />
    </>
  );
}

export { TradingRoutes, TradingWrapper };
