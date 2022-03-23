import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { colors } from '@Theming';

import { Header } from '@Common';
import { Button } from '@Common';
import { Footer } from '@Common';
import { Modal, useModal } from '@Common';

import { LoginForm } from '@Home';

import { StockChart } from '@Images';
function Home() {
  const { isModalOpen, toggleModal, modalChildren, setModalChildren } =
    useModal();
  return (
    <ThemeProvider theme={colors}>
      {isModalOpen ? (
        <Modal toggleModal={toggleModal} children={modalChildren}></Modal>
      ) : null}
      <Wrapper>
        <Header>
          <Button
            primary
            onClick={() => {
              setModalChildren(LoginForm);
              toggleModal();
            }}>
            Login
          </Button>
          <Button>Register</Button>
        </Header>
        <Body id='BODY'>
          <div>
            <h1>Welcome testing</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio quas et necessitatibus cum, molestiae pariatur aperiam
              officia vitae consectetur quisquam recusandae maiores similique
              est ipsum, quam nesciunt provident tempore officiis!
            </p>
          </div>
          <div>
            <img src={StockChart} width={750} height={'auto'}></img>
          </div>
        </Body>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.main`
  background: ${(props) => props.theme.bluegreen};
  flex: 1 0 auto;
  display: flex;
  padding: 3rem;
`;
