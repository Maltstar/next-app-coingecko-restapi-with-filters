import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import { Grid, _ } from 'gridjs-react';

const page1 = 1;

export default function GridCoinsList({ coinsData, currency, page, count }) {
  const router = useRouter();

  const [pageAPI, setPageAPI] = useState(page);
  const [previousPageAPI, setpreviousPageAPI] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataCoins, setCryptos] = useState([]);
  const [previousDataCoins, setpreviousCryptos] = useState([]);

  // Call API Endpoint via useEffect
  useEffect(() => {
    const fetchCoinsdata = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?&page=${pageAPI}&per_page=${count}&vs_currency=${
            currency ? 'eur' : 'usd'
          }&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`
        );

        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten!');
        } else {
          const jsonData = await response.json();
          setCryptos(jsonData);
          setIsLoaded(true);
          console.log('fetched');
          console.log(dataCoins);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error);
        setError(error);
      }
    };

    fetchCoinsdata();
  }, [pageAPI, currency]);

  // Formatierung als Array für von fetched Coin Daten das Grid
  const datacoins = dataCoins.map((singleEntry) => {
    return [
      // Logo
      _(
        singleEntry.image ? (
          <img
            key={singleEntry.id}
            src={singleEntry.image}
            width={25}
            height={25}
            alt=""
          />
        ) : (
          'N/A'
        )
      ),
      //CurrencyName
      singleEntry.name ? singleEntry.name : 'N/A',
      //TickerSymbol
      singleEntry.symbol ? singleEntry.symbol.toUpperCase() : 'N/A',
      //Current Price
      singleEntry.current_price
        ? `${singleEntry.current_price.toString()} ${currency ? '€' : '$'}`
        : 'N/A',
      //All-time High
      singleEntry.ath ? `${singleEntry.ath} ${currency ? '€' : '$'}` : 'N/A',
      //1d-%
      singleEntry.price_change_percentage_24h_in_currency
        ? singleEntry.price_change_percentage_24h_in_currency.toFixed(2)
        : 'N/A',
      //7d-%
      singleEntry.price_change_percentage_7d_in_currency
        ? singleEntry.price_change_percentage_7d_in_currency.toFixed(2)
        : 'N/A',
      //30d-%
      singleEntry.price_change_percentage_30d_in_currency
        ? singleEntry.price_change_percentage_30d_in_currency.toFixed(2)
        : 'N/A',
      // Optionen  => link to the cointdetails/[id].js
      _(
        <button
          id={singleEntry.id}
          className="custom-btn btn-1"
          onClick={() => {
            router.push(`/coindetails/${singleEntry.id.toLowerCase()}`);
          }}
        >
          <a>Details</a>
        </button>
      ),
    ];
  });

  return (
    <div>
      {/* Anzeige des Grids */}
      <Grid
        data={datacoins}
        columns={[
          {
            name: 'Logo',
            sort: {
              enabled: false,
            },
          },
          'CurrencyName',
          'TickerSymbol',
          'Current Price',
          'All-time High',
          '1d-%',
          '7d-%',
          '30d-%',
          'Optionen',
        ]}
        search={true}
        pagination={{
          enabled: true,
          limit: 10,
          summary: true,
        }}
      />

      <button
        disabled={pageAPI === 1 ? true : false}
        onClick={() => {
          setpreviousPageAPI(pageAPI);
          setPageAPI(pageAPI - 1);
        }}
      >
        Load previous results
      </button>
      <button
        onClick={() => {
          setpreviousPageAPI(pageAPI);
          setPageAPI(pageAPI + 1);
        }}
      >
        Load next results
      </button>
    </div>
  );
}
