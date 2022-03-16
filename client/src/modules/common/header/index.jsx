import styled from 'styled-components';

function Header() {
  return (
    <Container>
      <Title> Stock Trader</Title>
      <nav>
        <Button>Login</Button>
        <Button>Register</Button>
      </nav>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  background: lightskyblue;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: 'Lusitana-Bold';
  font-size: 5rem;
`;

const Button = styled.button`
  font-family: 'Raleway-Bold';
  font-size: 2rem;
`;
