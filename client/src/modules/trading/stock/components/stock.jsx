import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import styled from 'styled-components';

import { makeGetReq } from '@Common/utils';
import { BuySellWindow, Position } from '@Trading/stock';

function Stock() {
  const { bearerToken, tickerSymbol, holdings, cashBalance } =
    useOutletContext();
  const [stockData, setStockData] = useState();

  useEffect(async () => {
    const { data } = await makeGetReq('/api/stocks/price/tsla', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    setStockData(data);
  }, [setStockData]);

  return (
    <>
      <h1>{tickerSymbol}</h1>
      <FlexDiv column>
        <FlexDiv>
          <h4>GRAPH PLACEHOLDER</h4>
          <FlexDiv column>
            <Position holdings={holdings} />
            <BuySellWindow
              stockData={stockData}
              cashBalance={cashBalance}
              tickerSymbol={tickerSymbol}
              bearerToken={bearerToken}
            />
          </FlexDiv>
        </FlexDiv>
        <h4>ABOUT PLACEHOLDER</h4>
      </FlexDiv>
    </>
  );
}

export default Stock;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  padding: auto 1rem;
`;
