import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/layout/SearchBar';
import GridCoinlist from '@/components/GridCoinsList';
import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
import BarchartAthChange from '@/components/charts/BarchartAthChange';
import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';

export default function Home() {
  const [search, setSearch] = useState('');

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coinsData, setCryptos] = useState([]);

  // Button Clicker
  const initResults = 250;
  const initPage = 1;
  const initCurrency = 'eur';
  const [count, setCount] = useState(initResults);
  const [page, setPage] = useState(initPage);
  const [currency, setCurrency] = useState(initCurrency); // eur is true
  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage((currentCount) => currentCount - 1);
  const changeCurrency = () =>
    setCurrency((currentCurrency) => !currentCurrency);

  // Call API Endpoint via useEffect
  useEffect(() => {
    const fetchCoinsdata = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?&page=${page}&per_page=${count}&vs_currency=${
            currency ? 'eur' : 'usd'
          }&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`
        );

        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten!');
        } else {
          const jsonData = await response.json();
          console.log('jsonData');
          console.log(jsonData);
          setCryptos(jsonData);
          setIsLoaded(true);
          console.log('coinsData after setCryptos after fetching json');
          console.log(coinsData);
          console.log('isLoaded');
          console.log(isLoaded);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error);
        setError(error);
      }
    };

    fetchCoinsdata();
    //setCryptos(jsonData);
    console.log('Data after fetchCoinsdata()');
    console.log(coinsData);
    console.log('isLoaded');
    console.log(isLoaded);
  }, [count, page, currency]);

  const filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  //Searchbar Handler
  const searchList = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  };

  console.log('isLoaded return');
  console.log(isLoaded);
  return (
    <Layout title="Crypto Metrics">
      <SearchBar type="text" placeholder="Search" onChange={searchList} />
      Currency:{' '}
      <button className="custom-btn btn-15" onClick={changeCurrency}>
        {currency ? '€' : '$'}
      </button>
      {isLoaded && <GridCoinlist coinsData={filteredCoins} />}
      <div className="flex-container flex-align-right">
        <div>
          <button className="custom-btn btn-15" onClick={previousPage}>
            Previous
          </button>
          <button className="custom-btn btn-15" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
      <div className="flex-container">
        {isLoaded && (
          <PiechartMarketCap
            chartTitle="Marktkapitalisierung (Abs. Zahlen)"
            cryptos={filteredCoins}
          />
        )}
        <BarchartCirculatingSupply
          chartTitle="Umlaufmenge (Abs. Zahlen)"
          cryptos={filteredCoins}
        />
      </div>
      <div className="flex-container">
        {isLoaded && (
          <BarchartAthChange
            title="ATH Veränderung in %"
            cryptos={filteredCoins}
          />
        )}
        {isLoaded && (
          <PiechartTradeVolume
            title="Aktuelles Handelsvolumen (Abs. Zahlen)"
            cryptos={filteredCoins}
          />
        )}
      </div>
    </Layout>
  );
}
