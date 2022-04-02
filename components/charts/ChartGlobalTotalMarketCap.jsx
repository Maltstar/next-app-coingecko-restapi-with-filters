import Chart from 'chart.js/auto';
import { Pie, Doughnut } from 'react-chartjs-2';

const ChartGlobalTotalMarketCap = () => {
  /** Run Array Data from cryptos-prop through forEach and push data to ne   .Math.floor((number1 / number2) * 100);*/
  const currencySymbols = [];
  const globalMarketCap = [];
  const marketCapDominance = [];
  const colorArray = [
    '#f4a261',
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#e76f51',

    '#d4e09b',
    '#f6f4d2',
    '#cbdfbd',
    '#f19c79',
    '#a44a3f',

    '#79addc',
    '#ffc09f',
    '#ffee93',
    '#fcf5c7',
    '#adf7b6',
  ];

  // Sample JSON for testing
  const test = {
    data: {
      active_cryptocurrencies: 13453,
      upcoming_icos: 0,
      ongoing_icos: 49,
      ended_icos: 3376,
      markets: 782,
      total_market_cap: {
        btc: 47723800.40918993,
        eth: 663922396.8921582,
        ltc: 17011329496.24938,
        bch: 5906209356.932349,
      },
      total_volume: {
        btc: 2656263.924316776,
        eth: 36953325.097532794,
        ltc: 946835341.2368171,
      },
      market_cap_percentage: {
        btc: 39.8088183193843,
        eth: 18.113253814388212,
        usdt: 3.61976737688484,
        bnb: 3.3267464348241376,
      },
      market_cap_change_percentage_24h_usd: 0.4659903857232952,
      updated_at: 1648661066,
    },
  };

  //console.log(test.data.active_cryptocurrencies);

  // HelperVariable
  const totalMarketcap = test.data.total_market_cap;

  console.log(totalMarketcap);
  /* 
  totalMarketcap.map((index, coin) => {
    console.log(index, coin);
    // keep this line. Will be used once we receive real data form
    //globalMarketCap.push(coin.total_market_cap);
  }); */

  // colors are from: https://coolors.co/palettes/trending
  const globalTotalMarketCap = {
    labels: currencySymbols,
    datasets: [
      {
        data: totalMarketcap,
        backgroundColor: colorArray,
        hoverBackgroundColor: colorArray,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">MarketCap Global</h2>
        <Doughnut data={globalTotalMarketCap} width={50} height={50} />
      </div>
    </div>
  );
};

export default ChartGlobalTotalMarketCap;
