import Chart from 'chart.js/auto';
import { Bar, PolarArea, Doughnut } from 'react-chartjs-2';

const CirculatingSupply = ({ chartTitle, cryptos }) => {
  /* cryptos.forEach((value, index) => {
    console.log(`marketcap_dominance:${index}`, book.market_cap_dominance);
  }); */

  /** Run Array Data from cryptos-prop through forEach and push data to ne  */
  const currencySymbols = [];
  const circSupArray = [];
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
    circSupArray.push(coin.circulating_supply);
  });

  // colors are from: https://coolors.co/palettes/trending
  const circulatingSupply = {
    type: 'bar',
    labels: currencySymbols,
    borderColor: '#adf7b6',

    datasets: [
      {
        data: circSupArray,
        backgroundColor: colorArray,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{chartTitle}</h2>
        <Bar data={circulatingSupply} width={50} height={50} />
      </div>
    </div>
  );
};

export default CirculatingSupply;
