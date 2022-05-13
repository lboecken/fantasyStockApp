import { makePostReq } from '@Common/utils/';

function sellForm({ stockData, bearerToken, tickerSymbol }) {
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(bearerToken);
          const order = {
            SYMBOL: tickerSymbol,
            NUM_OF_SHARES: Number(e.target.quantity.value),
            COST_BASIS_PER_SHARE: stockData.data.latestPrice,
            TOTAL: e.target.quantity.value * stockData.data.latestPrice,
            TYPE: 'sell',
          };

          const data = await makePostReq(
            'txn/sell',
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
        <input type='text' disabled />
        <button type='submit'>Place Order</button>
      </form>
    </>
  );
}

export default sellForm;
