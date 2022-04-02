import Chart from 'chart.js/auto';
import { Pie, Doughnut } from 'react-chartjs-2';

const Piechart = ({ chartTitle, cryptos }) => {
  cryptos.forEach((book, index) => {
    //console.log(`i:${index}`, book.id);
  });
  cryptos.forEach((book, index) => {
    //console.log(`marketcap_dominance:${index}`, book.market_cap_dominance);
  });

  /** Run Array Data from cryptos-prop through forEach and push data to ne   .Math.floor((number1 / number2) * 100);*/
  const currencySymbols = [];
  const marketCap = [];
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

  cryptos.forEach((coin, index) => {
    //console.log(`marketcap_dominance:${index}`, coin.market_cap);
    currencySymbols.push(coin.symbol);
    marketCap.push(coin.market_cap);

    marketCapDominance.push(coin.market_cap_dominance);
  });

  // colors are from: https://coolors.co/palettes/trending
  const donutData = {
    labels: currencySymbols,
    datasets: [
      {
        data: marketCap,
        backgroundColor: colorArray,
        hoverBackgroundColor: colorArray,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{chartTitle}</h2>
        <Doughnut data={donutData} width={50} height={50} />
      </div>
    </div>
  );
};

export default Piechart;
