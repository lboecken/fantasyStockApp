import styled from 'styled-components';

import Button from '@Common/button';
import Form from './form';
import Input from '../common/input';

function LoginForm({ setIsLoggedIn }) {
  return (
    <>
      <Form
        onClick={(e) => {
          e.preventDefault();
          setIsLoggedIn(false);
        }}>
        <FlexDiv column>
          <Input type='text' placeholder='Username' />
          <Input type='password' placeholder='Password' />
          <Button type='submit'>Login</Button>
        </FlexDiv>
        <FlexDiv>
          <p>
            Please see our terms and conditions
            <a href='https://www.google.com' target='_blank'>
              here
            </a>
          </p>
        </FlexDiv>
      </Form>
    </>
  );
}

export default LoginForm;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  padding: auto 1rem;
  * {
    margin: 1rem auto;
  }
`;
