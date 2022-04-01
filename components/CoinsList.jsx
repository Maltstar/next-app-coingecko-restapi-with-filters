import React, { useState } from 'react';
import { getFormattedPrice } from '@/library/helpers';
import Link from 'next/link';

export default function CoinsList({ title, coinsData }) {
  return (
    <div className="table-card">
      <table id="currencyTable">
        <tr>
          <th>Logo</th>
          <th>CurrencyName</th>
          <th>TickerSymbol</th>
          <th>Current Price</th>
          <th>1d-%</th>
          <th>7d-%</th>
          <th>30d-%</th>
          <th>Optionen</th>
        </tr>
        {coinsData.map((singleEntry) => (
          <tr key={singleEntry.id}>
            <td>
              <img src={singleEntry.image} width={25} height={25} alt="" />
            </td>
            <td>{singleEntry.name}</td>
            <td>{singleEntry.symbol.toUpperCase()}</td>
            <td>{singleEntry.current_price}</td>
            <td>
              {singleEntry.price_change_percentage_24h_in_currency.toFixed(2)}
            </td>
            <td key={singleEntry.market_data}>
              {singleEntry.price_change_percentage_7d_in_currency.toFixed(2)}
            </td>
            <td key={singleEntry.market_data}>
              {singleEntry.price_change_percentage_30d_in_currency.toFixed(2)}
            </td>
            <td>
              <button id={singleEntry.id} className="custom-btn btn-15">
                <Link href={`/coindetails/${singleEntry.id.toLowerCase()}`}>
                  <a>Details</a>
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
