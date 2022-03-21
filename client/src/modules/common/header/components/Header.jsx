import styled from 'styled-components';

function Header() {
  return (
    <Container>
      <Title> Stock Trader</Title>
      <NavBar>
        <Button primary>Login</Button>
        <Button>Register</Button>
      </NavBar>
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

const Button = styled.button`
  font-family: 'Raleway-Bold';
  font-size: 2rem;
  border: 2px solid ${(props) => props.theme.white};
  border-radius: 3px;

  color: ${(props) => (props.primary ? props.theme.green : props.theme.white)};
  background-color: ${(props) =>
    props.primary ? props.theme.white : props.theme.green};
  font-size: ${(props) => console.log(props.theme)};
`;
