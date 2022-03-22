import styled from 'styled-components';
import { Button } from '@Common';

function Header({ children }) {
  return (
    <Container>
      <Title> Stock Trader</Title>
      <NavBar>{children}</NavBar>
    </Container>
  );
}

export default Header;

const NavBar = styled.nav`
  flex: 1 0 auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const Container = styled.header`
  background: ${(props) => props.theme.white};
  flex: 9 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const Title = styled.h1`
  flex: 1 0 auto;
  font-family: 'Lusitana-Bold';
  font-size: 5rem;
`;
