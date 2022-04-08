import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/layout/SearchBar';
import CoinsList from '@/components/CoinsList';
import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
import BarchartAthChange from '@/components/charts/BarchartAthChange';
import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
} from 'react-icons/hi';

export default function Home() {
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [coinsData, setCryptos] = useState([]);
  const [error, setError] = useState(null);

  // States and Actions
  const initResults = 10;
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
    const baseUrl = `https://api.coingecko.com/api/v3`;
    fetch(
      `${baseUrl}/coins/markets?&page=${page}&per_page=${count}&vs_currency=${
        currency ? 'eur' : 'usd'
      }&order=market_cap_desc&sparkline=false`
    )
      .then((res) => res.json())
      .then(
        (cryptoData) => {
          setIsLoaded(true);
          setCryptos(cryptoData);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [count, page, currency]);

  // coinsfilter
  const filteredCoins = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  //Searchbar
  const searchList = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <Layout title="Crypto Metrics">
      <div className="flex-container">
        <SearchBar type="text" placeholder="Search" onChange={searchList} />
        <select
          className="custom-btn btn-2"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <button
          className="custom-btn btn-2"
          onClick={changeCurrency}
          aria-label="Währungsumrechner"
        >
          {currency ? <HiOutlineCurrencyEuro /> : <HiOutlineCurrencyDollar />}
        </button>
      </div>

      <CoinsList coinsData={filteredCoins} currency={currency} />
      <div className="flex-container flex-align-right">
        <div>
          {page > 1 && (
            <button
              className="custom-btn btn-2"
              onClick={previousPage}
              aria-label="Vorherige Seite"
            >
              <HiOutlineArrowNarrowLeft />
            </button>
          )}

          <button
            className="custom-btn btn-2"
            onClick={nextPage}
            aria-label="Nächste Seite"
          >
            <HiOutlineArrowNarrowRight />
          </button>
        </div>
      </div>
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
