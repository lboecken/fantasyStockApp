import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { colors } from '@Theming';
import { Header } from '@Common';
import image from '@Images/stockchart.jpg';

function Home() {
  return (
    <ThemeProvider theme={colors}>
      <Wrapper>
        <Header />
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
            <img src={image} width={750} height={'auto'}></img>
          </div>
        </Body>
        <Footer>
          <ul>
            About the project
            <li>Source Code</li>
            <li>ULM Diagram</li>
          </ul>
          <ul>
            About the developer
            <li>LinkedIn </li>
            <li>Github </li>
            <li>Personal Website </li>
          </ul>
        </Footer>
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
  flex: 1 0 auto;
  display: flex;
  padding: 3rem;
`;

const Footer = styled.footer`
  margin-top: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: space-evenly;
  background: lightslategray;
  padding: 2rem;
`;
