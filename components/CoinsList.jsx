import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Chart from 'chart.js/auto';

// ChartJS Modifications here. Apply globally
Chart.defaults.color = 'rgba(75,192,192,1)';

export default function CoinsList({ coinsData, currency }) {
  //const router = useRouter();

  // Pagination
  // Triggers fetch for new page
  /* const handlePagination = (page) => {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
  }; */

  return (
    <div className="table-card">
      <table id="currencyTable">
        <tr>
          <th>Logo</th>
          <th>CurrencyName</th>
          <th>TickerSymbol</th>
          <th>Current Price</th>
          {/*   <th>1d-%</th>
          <th>7d-%</th>
          <th>30d-%</th> */}
          <th>Optionen</th>
        </tr>
        {coinsData.map((singleEntry) => (
          <tr key={singleEntry.id + 1}>
            <td>
              <img src={singleEntry.image} width={25} height={25} alt="coin" />
            </td>
            <td>{singleEntry.name}</td>
            <td>{singleEntry.symbol.toUpperCase()}</td>
            <td>
              {singleEntry.current_price} {currency ? '€' : '$'}
            </td>
            {/*   <td>{singleEntry.price_change_percentage_24h_in_currency}</td>
            <td key={singleEntry.market_data}>
              {singleEntry.price_change_percentage_7d_in_currency}
            </td>
            <td>{singleEntry.price_change_percentage_30d_in_currency}</td> */}
            <td>
              <button id={singleEntry.id} className="custom-btn btn-3">
                <Link href={`/coindetails/${singleEntry.id.toLowerCase()}`}>
                  <a>Details</a>
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </table>
      {/*  <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        initialPage={coinsData.curPage - 1}
        pageCount={coinsData.maxPage}
        onPageChange={handlePagination}
      /> */}
    </div>
  );
}
