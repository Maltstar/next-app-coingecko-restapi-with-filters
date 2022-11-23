import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import GridCoinlist from '@/components/GridCoinsList';
// import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
// import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
// import BarchartAthChange from '@/components/charts/BarchartAthChange';
// import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';
// import Charts from '@/components/Charts';
import Progressbar from '@/components/Progressbar';
import CustomSpinner from '@/components/Customspinner';
import Button from '@/components/Button';
import MenuPagination from '@/components/MenuPagination';
export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coinsData, setCryptos] = useState([]);
  const [allCoinsData, setAllCryptos] = useState([]);
  const [paginationGrid,setPaginationGrid] = useState(10);
  const [all_coins_loaded,SetAllCoinsLoaded] = useState(false); // flag to be aware of the loading of all coins
  const [loadAllResults, SetloadAllResults]= useState(false); // user flag requesting to load all the results
  //const [buttondisable, SetbuttonDisable]= useState(false); // flag set when button is disabled
  let first_timer;
  const loadAllCoins = () => {
    SetloadAllResults(true);
    setIsLoaded(false);
    }

  const ResetAllCoins = () => {
      SetloadAllResults(false); // indicate that the coins have to be loaded again
      setIsLoaded(false); // reset user flag requesting to load all the results
      }
  
  const [gridmountedForAllCoins,SetGridMountedForAllCoins] = useState(false); // flag to be aware of the loading of all coins
  // Button Clicker
  const last_api_page = 53 + 1; // from testing the last page page available when requesting 250 results per page is 53
  const initResults = 250; 
  const initPage = 1; // api request begins with 1st page 
  const initCurrency = 'eur'; // default currency is €
  const [count, setCount] = useState(initResults); // number of results collected per page
  const [page, setPage] = useState(initPage); // api request page
  const [currency, setCurrency] = useState(initCurrency); // eur is true
  
  // navigate to next page
  const nextPage = () => {
    // when the user navigate to the next page, reset all loading
    ResetAllCoins(); 
    setPage(page + 1);
    
  }; // set api page to fetch to next page
  const previousPage = () => {
    // when the user navigate to the previous page, reset all loading
    ResetAllCoins(); 
    setPage((currentCount) => currentCount - 1); // set api page to fetch to previous page
   
  };
  // change the symbol of currency between € and $
  // when the currency changed coins data shall be refetched
  const changeCurrency = () => {
    setIsLoaded(false);
    setCurrency((currentCurrency) => !currentCurrency);
  }

    
  const [mykeyword,setMyKeyword] = useState("");
 
  // Call API Endpoint via useEffect
  // api documentation for api/v3/coins/markets available at https://www.coingecko.com/api/documentations/v3/swagger.json 
  // and https://www.coingecko.com/en/api/documentation
  useEffect(() => {

    const fetchCoinsdata = async () => {
    
      try {
        // currency is a boolean 
        // example https://api.coingecko.com/api/v3/coins/markets?&page=53&per_page=250&vs_currency=eur&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?&page=${page}&per_page=${count}&vs_currency=${
            currency ? 'eur' : 'usd'
          }&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`,
        );
  
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten!');
        } else {
          const jsonData = await response.json();
          setCryptos(jsonData);
          setIsLoaded(true);
          SetloadAllResults(false); // user did not request to load all coins
        }
      } catch (error) {
        setError(error);
      }
    };

    const sleep  = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const fetchAllCoinsdata = async () => {

      let all_cryptos = [];
    
        // Free API* has a rate limit of 10-50 calls/minute so setup a delay between each request
        // 53 pages to fetch: 60/50 = 0,83 s between each call 
        for(let api_page = 1;api_page<last_api_page;api_page++)
        {
          try {
            // currency is a boolean 
            // example https://api.coingecko.com/api/v3/coins/markets?&page=53&per_page=250&vs_currency=eur&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/markets?&page=${api_page}&per_page=${count}&vs_currency=${
                currency ? 'eur' : 'usd'
              }&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`,
            );
    
            if (!response.ok) {
              throw new Error('Fehler beim Laden der Daten!');
            } else {
              const jsonData = await response.json();
              all_cryptos = [...all_cryptos,...jsonData];
            }
          } catch (error) {
            console.log(error);
            setError(error);
          }
          await (sleep(1300))
         
        };
    
        // removing duplicate
        const jsonObject = all_cryptos.map(JSON.stringify);
        const unique_cryptos = new Set(jsonObject);
        const uniqueArray = Array.from(unique_cryptos).map(JSON.parse);
        setAllCryptos(uniqueArray);
        setIsLoaded(true);
      }

    // user requested to load the coins data at once
    if(loadAllResults)
    {
      fetchAllCoinsdata();
      // signaling fetching for all coins is done
      SetAllCoinsLoaded(true);
    }
    else
    {
      fetchCoinsdata();
      // signaling fetching for all coins is not needed
      SetAllCoinsLoaded(false);
      // signaling grid for all coins is not needed
      SetGridMountedForAllCoins(false);
    }
   
  }, [count, page, currency,loadAllResults,last_api_page]);

  useEffect(()=>
  {
      // reset the grid mounted flag when currency change to request a new fetch apis
      SetGridMountedForAllCoins(false);
  },[currency]);

  
  //Searchbar Handler
  const searchList = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  };

  function updateKeyword () {
    const keyword = document.querySelector('[aria-label="Type a keyword..."]').value;
    setMyKeyword(keyword);      
  }

  const description = "Cryptos listing on gridview with metrics powered by api coin gecko V3";

  return (//Crypto Metrics
    <Layout title="Crypto Metrics" description={description}>
      
      {!(!gridmountedForAllCoins && loadAllResults) &&
      <>
        <Button
          className="custom-btn btn-15"
          currency={currency}
          onClick={changeCurrency}
          style={{ color: '#fff' }}
          gridmountedForAllCoins={gridmountedForAllCoins}
        />
      </>
      }
      {!isLoaded &&  !loadAllResults && <CustomSpinner />}
      {!gridmountedForAllCoins && loadAllResults && <Progressbar bgcolor='orange' height={30} isLoaded={isLoaded}/>}
      {isLoaded && // Menu to select the number of entries displayed on the grid 
      <MenuPagination paginationGrid={paginationGrid} setPaginationGrid={setPaginationGrid}/>}

      {isLoaded && (
        <>
          <GridCoinlist SetGridMountedForAllCoins={SetGridMountedForAllCoins} loadAllResults={loadAllResults} setMyKeyword={setMyKeyword} 
                        coins={loadAllResults ? allCoinsData : coinsData} fiat_currency={currency} paginationCount={paginationGrid}/>

          <button
          disabled={page === 1 ? true : false}
          onClick={previousPage}
          >
          Load previous 250 results
          </button>
    
          <button
            disabled={page === 53 ? true : false}
            onClick={nextPage}
          >
            Load next 250 results
          </button>

          <button
            disabled={all_coins_loaded ? true : false}
            onClick={loadAllCoins}
          >
            Load all results at once
          </button>

          {isLoaded && // Menu to select the number of entries displayed on the grid 
          <MenuPagination paginationGrid={paginationGrid} setPaginationGrid={setPaginationGrid}/>}
      </>
      )}

    </Layout>
  );
}
