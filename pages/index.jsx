import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/layout/SearchBar';
import CoinsList from '@/components/CoinsList';
import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
import BarchartAthChange from '@/components/charts/BarchartAthChange';
import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
} from 'react-icons/hi';

// Used Icons Library from https://react-icons.github.io/react-icons

// Call API Endpoint via ServerSideProps
/* export const getServerSideProps = async ({ query }) => {
  //first page is default
  const page = query.page || 1;
  let coinsData = null;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?&page=1&per_page=14&vs_currency=usd&order=market_cap_desc&sparkline=false`
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
}; */

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

  const display15 = () => setCount((currentCount) => currentCount - 10);
  const display25 = () => setCount(count + 10);

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
          <option value="25">50</option>
        </select>
        <button className="custom-btn btn-2" onClick={changeCurrency}>
          {currency ? <HiOutlineCurrencyEuro /> : <HiOutlineCurrencyDollar />}
        </button>
      </div>

      <CoinsList coinsData={filteredCoins} currency={currency} />
      <div className="flex-container flex-align-right">
        <div>
          {page > 1 && (
            <button className="custom-btn btn-2" onClick={previousPage}>
              <HiOutlineArrowNarrowLeft />
            </button>
          )}

          <button className="custom-btn btn-2" onClick={nextPage}>
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
