import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import { Grid,  _} from "gridjs-react";



export default function GridCoinsList({ coinsData,currency }) {
  const router = useRouter();

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

  console.log('coinsData CoinsList')
  console.log(coinsData)

  const [data, setData] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location);
    const data = urlSearchParams.get('paginated')
    //setData(data)
    console.log('urlSearchParams')
    console.log(urlSearchParams)
    console.log(data)
  }, []);





  console.log('coinsData')
  console.log(coinsData)


  // Formatierung als Array für von fetched Coin Daten das Grid 
  const datacoins = coinsData.map((singleEntry) =>
  {

    return (
          [ 
            // Logo
            _(<img key={singleEntry.id} src={singleEntry.image} width={25} height={25} alt=""/>) ,
            //CurrencyName
            singleEntry.name,
            //TickerSymbol
            singleEntry.symbol.toUpperCase(),
            //Current Price
            `${singleEntry.current_price.toString()} ${currency ? '€' : '$'}`,
            //All-time High
            `${singleEntry.ath} ${currency ? '€' : '$'}`,
            //1d-%
            singleEntry.price_change_percentage_24h_in_currency ? singleEntry.price_change_percentage_24h_in_currency.toFixed(2) : "N/A",
            //7d-%
            singleEntry.price_change_percentage_7d_in_currency ? singleEntry.price_change_percentage_7d_in_currency.toFixed(2) : "N/A",
            //30d-%
            singleEntry.price_change_percentage_30d_in_currency ? singleEntry.price_change_percentage_30d_in_currency.toFixed(2) : "N/A",
            // Optionen  => link to the cointdetails/[id].js
            _(<button id={singleEntry.id} className="custom-btn btn-1" onClick={ () => {router.push(`/coindetails/${singleEntry.id.toLowerCase()}`) }}>
              <a>Details</a>
          </button>)
          ]);
  });
  console.log('datacoins');
  console.log(datacoins);


   return (
     <div>
       {/* Anzeige des Grids */}
  <Grid
       data={datacoins}
      columns={[
        'Logo',
        'CurrencyName',
        'TickerSymbol',
        'Current Price',
        'All-time High',
        '1d-%',
        '7d-%',
        '30d-%',
        'Optionen'
      ]}

      search={true}
      pagination={{
        enabled: true,
        limit: 30,
      }}
    />

    </div>
  );
}

