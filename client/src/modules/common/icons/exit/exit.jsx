import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: red;
  margin: 0 0 0 auto;
  border: 1px solid red;
  border-radius: 50%;
  :hover {
    cursor: pointer;
    color: white;
    background: red;
  }
`;

function ExitIcon({ onClick }) {
  return <Icon onClick={onClick} icon={faCircleXmark}></Icon>;
}

export default ExitIcon;
