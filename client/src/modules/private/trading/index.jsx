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
  const [cashBalance, setCashBalance] = useState();
  const { bearerToken } = useOutletContext();
  console.log(bearerToken);

  useEffect(async () => {
    const { data } = await makeGetReq('portfolio/cash', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    setCashBalance(data.cash_balance);
  }, [setCashBalance]);

  const redirector = useRedirector();
  return (
    <>
      <ThemeProvider theme={colors}>
        <Header>
          <FlexDiv>
            <SearchInput placeholder='Search' />
          </FlexDiv>
          <FlexDiv>
            <Button onClick={() => redirector('portfolio')}>Portfolio</Button>
            <Button onClick={() => redirector('stocks/stocks')}>LogOut</Button>
          </FlexDiv>
        </Header>
        <Outlet context={{ cashBalance: cashBalance }} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default TradingWrapper;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  padding: auto 1rem;
  * {
    margin: 1rem auto;
  }
`;

const SearchInput = styled(Input)`
  align-self: center;
  width: 200%;
`;
