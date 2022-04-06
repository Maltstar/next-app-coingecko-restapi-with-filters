import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarchartAthChange = ({ title, cryptos }) => {
  /*
  cryptos.forEach((value, index) => {
    console.log(`marketcap_dominance:${index}`, book.market_cap_dominance);
  }); */

  /** Run Array Data from cryptos-prop through forEach and push data to ne  */
  const currencySymbols = [];
  const athChangeArray = [];
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

  cryptos.forEach((coin, index) => {
    currencySymbols.push(coin.symbol);
    athChangeArray.push(coin.ath_change_percentage);
  });

  //console.log(currencySymbols.toString());

  // colors are from: https://coolors.co/palettes/trending
  const athChange = {
    labels: currencySymbols,
    datasets: [
      {
        data: athChangeArray,
        backgroundColor: colorArray,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{title}</h2>
        <Bar data={athChange} width={75} height={75} />
      </div>
    </div>
  );
};

export default BarchartAthChange;
