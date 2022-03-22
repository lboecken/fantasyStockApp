import styled from 'styled-components';

const Button = styled.button`
  margin: auto;
  font-family: 'Raleway-Bold';
  font-size: 1.5rem;
  width: 100px;
  height: 50px;

  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.primary ? props.theme.green : props.theme.white)};
  color: ${(props) => (props.primary ? props.theme.green : props.theme.white)};
  background-color: ${(props) =>
    props.primary ? props.theme.white : props.theme.green};

  :hover {
    cursor: pointer;
    border: 2px solid
      ${(props) => (!props.primary ? props.theme.green : props.theme.white)};
    color: ${(props) =>
      !props.primary ? props.theme.green : props.theme.white};
    background-color: ${(props) =>
      !props.primary ? props.theme.white : props.theme.green};
  }
`;

export default Button;
