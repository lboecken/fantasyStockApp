import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

function Portfolio() {
  const { cashBalance } = useOutletContext();
  return (
    <>
      <FlexDiv column>
        <Title>Summary</Title>
        <FlexDiv>
          <div>
            <h4>CASH BALANCE</h4>
            <h5>{cashBalance}</h5>
          </div>
          <button onClick={() => console.log(cashBalance)}>CLICKME</button>
          <div>
            <h4>STOCK HOLDINGS VALUE</h4>
            <h5>$$$</h5>
          </div>
        </FlexDiv>
        <FlexDiv>
          <h3>Stock Holdings</h3>
          <h3>Transaction History</h3>
        </FlexDiv>
      </FlexDiv>
    </>
  );
}

export default Portfolio;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: space-evenly;
  row-gap: 1rem;
`;

const Title = styled.h3`
  text-align: center;
`;
