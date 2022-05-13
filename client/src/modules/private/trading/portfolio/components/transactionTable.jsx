import { makeGetReq } from '@Common/utils';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TransactionTable() {
  const { bearerToken } = useOutletContext();
  const [tableData, setTableData] = useState([]);
  useEffect(async () => {
    const response = makeGetReq('txn/get_all', {
      headers: { Authorization: `Bearer ${bearerToken}` },
    });
    console.log(response);
  }, [setTableData]);
  return (
    <>
      <table>
        <thead>
          <th>ID</th>
          <th>Ordered at</th>
          <th>Type</th>
          <th>Symbol</th>
          <th># of Shares</th>
          <th>$ / Share</th>
          <th>Total Cost</th>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

export default TransactionTable;
