import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.lightblue},
    white
  );
  border: 2px solid ${(props) => props.theme.bluegreen};
  border-radius: 25px;
  width: ${(props) => (props.width ? props.width : '300px')};
  height: ${(props) => (props.height ? props.height : '300px')};
  max-width: 100%;
  height: auto;
  max-height: 600px;
`;

export default Card;
