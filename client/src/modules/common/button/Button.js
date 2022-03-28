import styled from 'styled-components';

const Button = styled.button`
  margin: auto;
  font-family: 'Raleway-Bold';
  font-size: 1.5rem;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.primary ? props.theme.bluegreen : props.theme.white)};
  color: ${(props) =>
    props.primary ? props.theme.bluegreen : props.theme.white};
  background-color: ${(props) =>
    props.primary ? props.theme.white : props.theme.bluegreen};

  :hover {
    cursor: pointer;
    border: 2px solid
      ${(props) => (!props.primary ? props.theme.bluegreen : props.theme.white)};
    color: ${(props) =>
      !props.primary ? props.theme.bluegreen : props.theme.white};
    background-color: ${(props) =>
      !props.primary ? props.theme.white : props.theme.bluegreen};
  }
`;

export default Button;
