import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { useRedirector } from '@Hooks';

import { makeGetReq } from '@Common/utils';

import { colors } from '@GlobalStyles';
import Header from '@Common/header';
import Button from '@Common/button';
import Footer from '@Common/footer';
import Input from '@Common/input';

function TradingWrapper() {
  const redirector = useRedirector();
  const [cashBalance, setCashBalance] = useState();
  const [tickerSymbol, setTickerSymbol] = useState();
  const [holdings, setHoldings] = useState();
  const { bearerToken } = useOutletContext();

  const CONTEXT = {
    bearerToken: bearerToken,
    tickerSymbol: tickerSymbol,
    cashBalance: cashBalance,
    holdings: holdings,
  };

  useEffect(async () => {
    const { data } = await makeGetReq('/api/portfolio/holdings', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    setHoldings(data);
  }, [setHoldings]);

  useEffect(async () => {
    const { data } = await makeGetReq('/api/portfolio/cash', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    setCashBalance(data.cash_balance);
  }, [setCashBalance]);

  return (
    <>
      <ThemeProvider theme={colors}>
        <Wrapper column>
          <Header>
            <FlexDiv>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  redirector(`../../trading/stocks/${tickerSymbol}`);
                }}>
                <SearchInput
                  placeholder='Search'
                  onChange={(e) => setTickerSymbol(e.target.value)}
                />
              </form>
            </FlexDiv>
            <FlexDiv>
              <Button onClick={() => redirector('portfolio')}>Portfolio</Button>
              <Button onClick={() => redirector('stocks/stocks')}>
                LogOut
              </Button>
            </FlexDiv>
          </Header>
          <Outlet context={CONTEXT} />
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default TradingWrapper;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  padding: auto 1rem;
`;

const SearchInput = styled(Input)`
  align-self: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
`;
