import styled from 'styled-components';

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
  flex: auto 1 auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Container = styled.header`
  background: ${(props) => props.theme.white};
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.lightblue},
    white
  );
  flex: 9 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.75px solid ${(props) => props.theme.grey};
`;

const Title = styled.h1`
  flex: 1 0 auto;
  font-family: 'Lusitana-Bold';
  font-size: 4.5rem;
`;
