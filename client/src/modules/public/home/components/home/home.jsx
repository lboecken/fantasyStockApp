import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { colors } from '@GlobalStyles';
import { StockChart } from '@Images';

import { useContextManager } from '@Hooks';

import Header from '@Common/header';
import Button from '@Common/button';
import Footer from '@Common/footer';
import Modal, { useModal } from '@Common/modal';

import { LoginForm, RegisterForm } from '@Home';

function Home() {
  const { isModalOpen, toggleModal, setModalContent, modalContent } =
    useModal();
  const { setIsLoggedIn, API_URL } = useContextManager();
  return (
    <>
      <ThemeProvider theme={colors}>
        {/* Modal gets appended to document.body by ReactDOM.createPortal */}
        {isModalOpen ? (
          <Modal toggleModal={toggleModal} content={modalContent}></Modal>
        ) : null}
        <Wrapper>
          <Header>
            <Button
              primary
              onClick={() => {
                setModalContent(<LoginForm setIsLoggedIn={setIsLoggedIn} />);
                toggleModal();
              }}>
              Login
            </Button>
            <Button
              onClick={() => {
                setModalContent(<RegisterForm API_URL={API_URL} />);
                toggleModal();
              }}>
              Register
            </Button>
          </Header>
          <Body id='BODY'>
            <div>
              <h1>Welcome testing</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio quas et necessitatibus cum, molestiae pariatur
                aperiam officia vitae consectetur quisquam recusandae maiores
                similique est ipsum, quam nesciunt provident tempore officiis!
              </p>
            </div>
            <>
              <Image src={StockChart} width={750} height={'auto'} />
            </>
          </Body>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
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

const Image = styled.img`
  border-radius: 20px;
`;
