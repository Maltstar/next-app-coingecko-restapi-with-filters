import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const Polarchart = ({ title, cryptos }) => {
  /*
  cryptos.forEach((value, index) => {
    console.log(`marketcap_dominance:${index}`, book.market_cap_dominance);
  }); */

  /** Run Array Data from cryptos-prop through forEach and push data to ne  */
  const currencySymbols = [];
  const totalVolArray = [];
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

  cryptos.forEach((coin) => {
    currencySymbols.push(coin.symbol);
    totalVolArray.push(coin.total_volume);
  });

  //console.log(currencySymbols.toString());

  // colors are from: https://coolors.co/palettes/trending
  const totalVolume = {
    labels: currencySymbols,
    datasets: [
      {
        data: totalVolArray,
        backgroundColor: colorArray,
      },
    ],
    options: {
      responsive: true,
    },
  };

  return (
    <div class="flex-item">
      <div className="card">
        <h2 className="text-centered">{title}</h2>
        <Doughnut data={totalVolume} width={50} height={50} />
      </div>
    </div>
  );
};

export default Polarchart;
