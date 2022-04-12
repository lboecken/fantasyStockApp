import { useState, useEffect } from 'react';

import Card from '@Common/card';

import { Buy, Sell } from '@Private/trading/stock';

function BuySellWindow({ stockData, cashBalance, bearerToken, tickerSymbol }) {
  const [buyOrSell, setBuyOrSell] = useState();
  useEffect(() => console.dir(stockData), [stockData]);
  console.log(bearerToken);
  return (
    <>
      <Card>
        <button
          type='button'
          onClick={() => {
            setBuyOrSell(
              <Buy
                stockData={stockData}
                cashBalance={cashBalance}
                bearerToken={bearerToken}
                tickerSymbol={tickerSymbol}
              />
            );
          }}>
          BUY
        </button>
        <button
          type='button'
          onClick={() => {
            setBuyOrSell(
              <Sell
                stockData={stockData}
                cashBalance={cashBalance}
                bearerToken={bearerToken}
                tickerSymbol={tickerSymbol}
              />
            );
          }}>
          SELL
        </button>
        {buyOrSell}
      </Card>
    </>
  );
}

export default BuySellWindow;
