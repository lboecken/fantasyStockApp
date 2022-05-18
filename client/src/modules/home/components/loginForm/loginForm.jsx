import styled from 'styled-components';

import { makePostReq } from '@Common/utils';
import Button from '@Common/button';
import Form from './form';
import Input from '@Common/input';

function LoginForm({ setIsLoggedIn, setBearerToken }) {
  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const requestBody = {
            username: e.target.username.value,
            password: e.target.password.value,
          };
          const loginRes = await makePostReq('/api/auth/login', requestBody);
          if (loginRes.status !== 201) return;
          setBearerToken(loginRes.data.access_token);
          setIsLoggedIn(true);
        }}>
        <FlexDiv column>
          <Input type='text' placeholder='Username' name='username' />
          <Input type='password' placeholder='Password' name='password' />
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
