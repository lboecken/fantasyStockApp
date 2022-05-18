import styled from 'styled-components';

import Button from '@Common/button';
import Form from './form';
import Input from '@Common/input';

import { makePostReq } from '@Common/utils';

function RegisterForm({ setIsLoggedIn }) {
  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const requestBody = {
            username: e.target.username.value,
            password: e.target.password.value,
          };
          const registerRes = await makePostReq(
            '/api/auth/register',
            requestBody,
            {}
          );
          if (registerRes.status !== 201) console.log(registerRes);
          const loginRes = await makePostReq('/api/auth/login', requestBody);
          if (loginRes.status === 201) {
            setIsLoggedIn(true);
          }
        }}>
        <FlexDiv column>
          <Input type='text' placeholder='Username' name='username' />
          <Input type='password' placeholder='Password' name='password' />
          <Input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
          />
        </FlexDiv>
        <FlexDiv>
          <Button type='submit'>Register</Button>
        </FlexDiv>
      </Form>
    </>
  );
}

export default RegisterForm;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  padding: auto 1rem;
  * {
    margin: 1rem auto;
  }
`;
