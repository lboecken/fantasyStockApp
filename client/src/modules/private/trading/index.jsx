import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { useRedirector } from '@Hooks';

import { colors } from '@GlobalStyles';
import Header from '@Common/header';
import Button from '@Common/button';
import Footer from '@Common/footer';
import Input from '@Common/input';

function TradingWrapper() {
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
            <Button onClick={() => redirector('transactions')}>
              Transactions
            </Button>
          </FlexDiv>
        </Header>
        <Outlet />
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
