import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from  'next/image';
// constructors for the Grid Ansicht
import { Grid, _ } from 'gridjs-react';
import Link from 'next/link';
// import { PluginPosition } from "gridjs";
// import GridReadyListener from '@/components/GridReadyListener';

const page1 = 1;

//export default function GridCoinsList({ coins, currency, page, count }) {
export default function GridCoinsList({ SetGridMountedForAllCoins, loadAllResults, setMyKeyword, coins, fiat_currency, paginationCount }) 
{
  const router = useRouter();
  const [dataCoins, setCryptos] = useState([]);
  const [currency, setCurrency] = useState([]);
  function updateKeyword () {
    const keyword = document.querySelector('[aria-label="Type a keyword..."]').value;
    setMyKeyword(keyword);
  }

  //const defaut_pagination = paginationGrid;

  /* compare 2 numbers without decimal "." */
  function compare_values(a,b)
  {
    // extract the price from the string and convert it to a number to use the gridjs sort function properly, 
                  // e.g "20 220 €" => ["20 220", "€"] => ["20220"] => "20220" => number <20220>
                  const value =(x) => Number(x.split(' ').slice(0,x.length-2)[0]);
                  // compare 2 currencies prices
                  if (value(a) > value(b)) { // price a > price b
                    return 1;
                  } else if (value(b) > value(a)) { //price a < price b
                    return -1;
                  } else { // price a == price b
                    return 0;
                  }
  }

  // update the component only when data for coins changed (either the currency changed or the user requested to fetch new coins)
   useEffect(() => {
   const UpdateStatusGridMountedForAllCoins = (prevGridMountedForAllCoins) => {
      if(loadAllResults) // user has requested to load all coins
      {// signaling the grid has been mounted to revome the progress bar only when all coins have been fetched not just after the user
        // requested to load all coins
        prevGridMountedForAllCoins ? SetGridMountedForAllCoins(prevGridMountedForAllCoins) :
        SetGridMountedForAllCoins(!prevGridMountedForAllCoins)
      };
    }
    setCryptos(coins);
    setCurrency(fiat_currency);
    UpdateStatusGridMountedForAllCoins(); 
  }, [coins,fiat_currency,SetGridMountedForAllCoins]);

  // Formatierung als Array für von fetched Coin Daten das Grid
  const datacoins = dataCoins.map((singleEntry) => {
    return [
      // Logo: show logo when available otherwise show N/A
      _(
        singleEntry.image != "missing_large.png" ? (
          <Image
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
      singleEntry.current_price ? `${singleEntry.current_price.toString()} ${currency ? '€' : '$'}`
      : 'N/A',
            
      //Marketcap
      singleEntry.market_cap ? currency ? 
           singleEntry.market_cap.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) : 
           singleEntry.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' }):
          'N/A',
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
        //? singleEntry.price_change_percentage_30d_in_currency
        : 'N/A',
      // Optionen  => link to the cointdetails/[id].js
      // singleEntry.id is always set to a value different from null so no need to test it
                /* // onClick={() => {
          //   router.push(`/coindetails/${singleEntry.id.toLowerCase()}`);
          //        */
      _(
        <button id={singleEntry.id} className="custom-btn btn-1"
           onClick={() => {
             router.push(`/coindetails/${singleEntry.id.toLowerCase()}`);
           }}>
           <a href={`/coindetails/${singleEntry.id.toLowerCase()}`}>Details</a>
          {/* <Link href={`/coindetails/${singleEntry.id.toLowerCase()}`}>
          <a onClick={(e) => {router.push(`/coindetails/${singleEntry.id.toLowerCase()}`)}}>Details</a> 
          </Link> */}

        </button>
      ),
    ];
  });

  // documentation for the gridjs available at https://gridjs.io/docs/
  return (//grid
    <div>
      {/* Anzeige des Grids */}
      { <Grid
        data={datacoins}
        // Einstellung von der Spalten des Grids
        columns={[
          {
            name: 'Logo',
            sort: {
              enabled: false,
            },
          },
          'CurrencyName',
          'TickerSymbol',
          {
            name: 'Current Price',
            // custom sort needed as the price is displayed as string
            sort: {
              compare: (a, b) => {
                // checking if data are available
                  // extract the price from the string and convert it to a number to use the gridjs sort function properly, 
                  // e.g "20220.24 €" => ["20220.24", "€"] => ["20220.24"] => "20220.24" => number <20220.24>
                  const value =(x) => Number(x.split(' ')[0]);

                  //console.log("Current Price");
                  // compare 2 currencies prices
                  if (value(a) > value(b)) { // price a > price b
                    return 1;
                  } else if (value(b) > value(a)) { //price a < price b
                    return -1;
                  } else { // price a == price b
                    return 0;
                  }
                
              },
            },
          },
          {
            name: 'Marketcap',
            // custom sort needed as the marketcap is displayed as string
            sort: 
            {
              compare: (a, b) => {


                 // checking if data are available
                 //const data_status = Handling_NA(a,b);
                 // handling the case where no data are available, data = N/A
                 if((a == 'N/A' || b == 'N/A') || (a == 'N/A' && b == 'N/A'))
                 {
                    return (compare_values(a,b));
                 }
                 else
                 {
                    let value_array;
                    // extract the price from the string and convert it to a number to use the gridjs sort function properly, 
                    // price can have the following format
                    // e.g "378.832.508.726,00 €":
                    // - 1 step is to change the format from "378.832.508.726,00 €" to "378832508726.00 €"
                    // - 2nd step remove " €"  from "378832508726.00 €" =>  "378832508726.00"
                    // - 3rd step convert the string to a number => "378832508726.00" => Number<378832508726.00>
                    // - 4th step compare the number
                    currency ?  value_array =(x) => {
                                                      let result = {
                                                        number_string: "",
                                                        decimal_null: true,
                                                      };
                                                      // e.g "378.832.508.726,00 €" => "378.832.508.726,00 " => "378.832.508.726"
                                                      let wholepart = x.split('€').slice(0)[0].split(',').slice(0)[0];
                                                      // "378.832.508.726" => "378832508726"
                                                      wholepart = wholepart.replaceAll(".", "")
                                                      // e.g "378.832.508.726,00 €" => "378.832.508.726,00 " => "00 " => "00"
                                                      let decimal = x.split('€').slice(0)[0].split(',').slice(0)[1];
                                                      decimal = decimal.slice(0,decimal.length-1);
                                                      const number_string = wholepart + "." + decimal;
                                                                                                         
                                                      return(number_string);
                                                    }:

                                value_array =(x) => {
                                                      let result = {
                                                        number_string: "",
                                                        decimal_null: true,
                                                      };
                                                      //  e.g "$378,832,508,726.00" => "378,832,508,726.00 " => "378,832,508,726"
                                                      let wholepart = x.split('$').slice(0)[1].split('.').slice(0)[0];
                                                      // "378.832.508.726" => "378832508726"
                                                      wholepart = wholepart.replaceAll(",", "")
                                                      // e.g "$378,832,508,726.00" => "378,832,508,726.00 " => "00"
                                                      let decimal = x.split('$').slice(0)[1].split('.').slice(0)[1];
                                                      const number_string = wholepart + "." + decimal;
                                                                                                         
                                                      return(number_string);
                                                    };

                    // x object number string, y original string
                    const compare_marketcap_value = (a,b) => 
                    {
                      return(compare_values(value_array(a),value_array(b)));
                    }

                    return(compare_marketcap_value(a,b));

                 }
              },
            },
          },   
          {
            name: 'All-time High',
            // custom sort needed as the price is displayed as string
            sort: {
              compare: (a, b) => {
                // extract the price from the string and convert it to a number to use the gridjs sort function properly, 
                // e.g "4228.93 €" => ["4228.93", " "] => ["4228.93"] => "4228.93" => number <4228.93>
                // N/A
                const value =(x) => Number(x.split(' ').slice(0,x.length-2)[0]);
                // compare 2 All-time High (ath)
                if (value(a) > value(b)) { // ath a > ath b
                  return 1;
                } else if (value(b) > value(a)) { //ath a < ath b
                  return -1;
                } else { // ath a == ath b
                  return 0;
                }
              },
            },
          }, 
          {
            name: '1d-%',
            // custom sort needed as the 1d-%' is displayed as string
            sort: {
              compare: (a, b) => {
                // convert string into number
                const value =(x) => Number(x);

                // compare 2 1d-%
                if (value(a) > value(b)) { // 1d-% a > 1d-% b
                  return 1;
                } else if (value(b) > value(a)) { //1d-% a < 1d-% b
                  return -1;
                } else { // 1d-% a == 1d-% b
                  return 0;
                }
              },
            },
          }, 
          {
            name: '7d-%',
            // custom sort needed as the 7d-% is displayed as string
            sort: {
              compare: (a, b) => {
                // convert string into number
                const value =(x) => Number(x);
                // compare 2 7d-%
                if (value(a) > value(b)) { // 7d-% a > 7d-% b
                  return 1;
                } else if (value(b) > value(a)) { //7d-% a < 7d-% b
                  return -1;
                } else { // 7d-% a == 7d-% b
                  return 0;
                }
              },
            },
          },
          {
            name: '30d-%',
            // custom sort needed as the 30d-% is displayed as string
            sort: {
              compare: (a, b) => {
                // convert string into number
                // console.log("SearchConfig.keyword");
                // console.log(SearchConfig.keyword);
                const value =(x) => Number(x);
                // compare 2 30d-%
                if (value(a) > value(b)) { // 30d-% a > 30d-% b
                  return 1;
                } else if (value(b) > value(a)) { //30d-% a < 30d-% b
                  return -1;
                } else { // 30d-% a == 30d-% b
                  return 0;
                }
              },
            },
          },
          {
            name: 'Optionen',
            sort: {
              enabled: false,
            },
          }
        ]}
        search={
                 {
                  enable:true,
                  placeholder: '🔍 Search...'
                 }
                }
        pagination={{
          enabled: true,
          // define pagination dynamicylly according to user choice
          limit: (paginationCount==="5000") ? 5000 : 
                 (paginationCount==="2500") ? 2500 :
                 (paginationCount==="1000") ? 1000 :
                 (paginationCount==="500") ? 500 : 
                 (paginationCount==="250") ? 250 :
                 (paginationCount==="100") ? 100 :
                 (paginationCount==="50") ? 50 :
                 (paginationCount==="20") ? 20 :
                 (paginationCount==="10") ? 10 :
                 //default pagination value 
                 10,
          summary: true,
        }}
        sort={true}
        // plugin might be used to get the seach keyword from the grid and filter coins fetched according to and displaying the associated charts
        // so far it seems that the user plugin can not take input parameter so there is no way to get the search keyword outside the grid
        // an input could be a setter to get the search keyword or could be the charts component to be displayed after each keyword search
        // as the documentation does not stating anything about inputs, asking in forum could helo
        // plugins={
        //           [
        //             {
        //               id: 'GridReadyListenerPlugin',
        //               component: GridReadyListener,
        //               position: PluginPosition.Footer,
        //               order: 1,              
        //             }
        //           ]
        //         }
      />}
     
   </div>
  );
}
