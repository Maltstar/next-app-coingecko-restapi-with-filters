import Chart from 'chart.js/auto';
import { PolarArea } from 'react-chartjs-2';

const PolarchartDetail = ({ chartTitle, singleCryptoStats }) => {
  /*   cryptos.forEach((book, index) => {
    //console.log(`i:${index}`, book.id);
  });
  cryptos.forEach((book, index) => {
    console.log(`marketcap_dominance:${index}`, book.market_cap_dominance);
  }); */

  /** Run Array Data from cryptos-prop through forEach and push data to ne  */
  const currencySymbols = [];
  const scoreMetricsArray = [];
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

  /*  singleCryptoStats.forEach((coin) => {
    currencySymbols.push(coin.symbol);
    scoreMetricsArray.push(coin.coingecko_score);
  }); */
  //console.log(singleCryptoStats.developer_score);

  const scoreMetrics = {
    labels: currencySymbols,
    datasets: [
      {
        labels: ['coingecko'],
        data: [
          singleCryptoStats.coingecko_score,
          singleCryptoStats.developer_score,
          singleCryptoStats.community_score,
          singleCryptoStats.liquidity_score,
        ],
        backgroundColor: ['#f4a261', '#264653', '#2a9d8f', '#e9c46a'],
      },
    ],
    options: {
      responsive: true,
    },
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{chartTitle}</h2>
        <PolarArea data={scoreMetrics} width={50} height={50} />
      </div>
    </div>
  );
};

export default PolarchartDetail;
