import styled from 'styled-components';

function Footer() {
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
}

export default Footer;

const StyledFooter = styled.footer`
  margin-top: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: space-evenly;
  background: lightslategray;
  padding: 2rem;
`;
