import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/layout/SearchBar';
import CoinsList from '@/components/CoinsList';
import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
import BarchartAthChange from '@/components/charts/BarchartAthChange';
import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';

// Call API Endpoint via ServerSideProps
export const getServerSideProps = async ({ query }) => {
  //first page is default
  const page = query.page || 1;
  let coinsData = null;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?&page=1&per_page=14&vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`
    );
    if (res.status !== 200) {
      throw new Error('Failed to fetch');
    }
    coinsData = await res.json();
  } catch (err) {
    coinsData = { error: { message: err.message } };
  }

  return {
    props: {
      coinsData,
    },
  };
};

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
        <PiechartMarketCap
          chartTitle="Marktkapitalisierung (Abs. Zahlen)"
          cryptos={filteredCoins}
        />
        <BarchartCirculatingSupply
          chartTitle="Umlaufmenge (Abs. Zahlen)"
          cryptos={filteredCoins}
        />
      </div>
      <div className="flex-container">
        <BarchartAthChange
          title="ATH Veränderung in %"
          cryptos={filteredCoins}
        />
        <PiechartTradeVolume
          title="Aktuelles Handelsvolumen (Abs. Zahlen)"
          cryptos={filteredCoins}
        />
      </div>
    </Layout>
  );
}
