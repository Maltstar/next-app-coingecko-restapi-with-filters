import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DonutTradeVolume = ({ title, cryptos }) => {
  /** Run Array Data from cryptos-prop through forEach and push data to ne
   * colors are from: https://coolors.co/palettes/trending
   */
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
  try {
    cryptos.forEach((coin, index) => {
      currencySymbols.push(coin.symbol);
      totalVolArray.push(coin.total_volume);
      if (index == 14) throw new Error();
    });
  } catch (E) {
    console.log('To much IPs in block.');
  }

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
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{title}</h2>
        <Doughnut data={totalVolume} width={50} height={50} />
      </div>
    </div>
  );
};

export default DonutTradeVolume;
