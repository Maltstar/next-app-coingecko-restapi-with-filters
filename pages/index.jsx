import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import CoinsList from '@/components/CoinsList';
import Piechart from '@/components/Piechart';
import Scatterchart from '@/components/Scatterchart';
import Barchart2 from '@/components/Barchart2';
import Polarchart from '@/components/Polarchart';

export default function Home({ coinsData }) {
  const [search, setSearch] = useState('');

  const filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  //Searchbar Handler
  const searchList = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <Layout title="Crypto Metrics">
      <SearchBar type="text" placeholder="Search" onChange={searchList} />
      <CoinsList coinsData={filteredCoins} />
      <div className="flex-container">
        <Piechart cryptos={filteredCoins} />
        <Scatterchart cryptos={filteredCoins} />
      </div>
      <div className="flex-container">
        <Barchart2 title="ATH Veränderung in %" cryptos={filteredCoins} />
        <Polarchart
          title="Aktuelles Handelsvolumen - Absolute Zahlen"
          cryptos={filteredCoins}
        />
      </div>
    </Layout>
  );
}

// Call API Endpoint
export const getServerSideProps = async () => {
  const res = await fetch(
    //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=14&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d`
  );

  const coinsData = await res.json();

  return {
    props: {
      coinsData,
    },
  };
};
