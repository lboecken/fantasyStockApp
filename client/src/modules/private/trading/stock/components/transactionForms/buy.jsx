import { makePostReq } from '@Common/utils';

function Buy({ stockData, cashBalance, tickerSymbol, bearerToken }) {
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(bearerToken);
          const order = {
            SYMBOL: tickerSymbol,
            NUM_OF_SHARES: e.target.quantity.value,
            COST_BASIS_PER_SHARE: stockData.data.latestPrice,
            TOTAL: e.target.quantity.value * stockData.data.latestPrice,
          };

          const data = await makePostReq(
            'txn/buy',
            { transaction: order },
            { headers: { Authorization: `Bearer ${bearerToken}` } }
          );
          console.log(data);
        }}>
        <label>quantity</label>
        <input type='number' name='quantity' />
        <label>price</label>
        <input type='text' disabled value={stockData.data.latestPrice} />
        <label>Max stocks available</label>
        <input
          type='text'
          disabled
          value={Math.floor(cashBalance / stockData.data.latestPrice)}
        />
        <button type='submit'>Place Order</button>
      </form>
    </>
  );
}

export default Buy;
