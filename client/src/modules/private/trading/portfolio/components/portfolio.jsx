import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

import Card from '@Common/card';
import { TransactionTable } from '@Private/trading/portfolio';

function Portfolio() {
  const { cashBalance, bearerToken } = useOutletContext();

  return (
    <>
      <FlexDiv column>
        <Title>Summary</Title>
        <FlexDiv>
          <Card width='200px'>
            <h4>CASH BALANCE</h4>
            <h5>{cashBalance}</h5>
          </Card>
          <Card>
            <h4>STOCK HOLDINGS VALUE</h4>
            <h5>$$$</h5>
          </Card>
        </FlexDiv>
        <FlexDiv>
          <Card>
            <h3>Transaction History</h3>
            <TransactionTable />
          </Card>
          <Card>
            <h3>Stock Holdings</h3>
          </Card>
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
