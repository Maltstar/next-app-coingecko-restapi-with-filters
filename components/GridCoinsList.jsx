import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { Grid } from 'gridjs-react';

export default function CoinsList({ coinsData }) {
  console.log('coinsData CoinsList');
  console.log(coinsData);

  //const singleEntry = coinsData[0];
  const coins = coinsData.map((singleEntry) => {
    return [
      singleEntry.name,
      singleEntry.symbol.toUpperCase(),
      singleEntry.current_price,
    ];
  });

  console.log('coinsData');
  console.log(coinsData);
  console.log('coins');
  console.log(coins);

  const singleEntry = coinsData[0];
  const singleEntry2 = coinsData[1];
  console.log('singleEntry');
  console.log(singleEntry);

  const datacoins = coinsData.map((singleEntry) => {
    return [
      singleEntry.name,
      singleEntry.symbol.toUpperCase(),
      singleEntry.current_price,
    ];
  });
  console.log('datacoins');
  console.log(datacoins);

  return (
    <div>
      <Grid
        data={datacoins}
        columns={['CurrencyName', 'TickerSymbol', 'Current Price']}
        search={true}
        pagination={{
          enabled: true,
          limit: 25,
        }}
      />
    </div>
  );
}
