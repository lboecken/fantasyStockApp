import styled from 'styled-components';

import Button from '@Common/button';
import Form from './form';
import Input from '../common/input';
import axios from 'axios';

function RegisterForm({ API_URL }) {
  return (
    <>
      <Form
        onClick={(e) => {
          e.preventDefault();
          console.log(API_URL);
          postAPI(
            { username: 'test2', password: 'test2' },
            API_URL + 'auth/register'
          );
        }}>
        <FlexDiv column>
          <Input type='text' placeholder='Username' />
          <Input type='email' placeholder='Email' />
          <Input type='password' placeholder='Password' />
          <Input type='password' placeholder='Confirm Password' />
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

async function getAPI(url, request) {
  const response = await axios(url, request);
  console.log(response);
}

async function postAPI(url, request) {
  const response = await axios.post(url, request);
  console.log(response);
}
