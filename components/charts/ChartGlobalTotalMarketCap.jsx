import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const ChartGlobalTotalMarketCap = ({ chartTitle, globalCryptoStats }) => {
  // HelperVariable
  const totalMarketcap = globalCryptoStats.data.total_market_cap;

  const namesArray = [];
  const marketCapArray = [];
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

  // https://infinitbility.com/how-to-get-key-and-value-from-json-object-in-javascript
  for (let key of Object.keys(totalMarketcap)) {
    //console.log(key);
    namesArray.push(key);
  }
  for (let value of Object.values(totalMarketcap)) {
    //console.log(value);
    marketCapArray.push(value);
  }

  // colors are from: https://coolors.co/palettes/trending
  const globalTotalMarketCap = {
    labels: namesArray,
    datasets: [
      {
        data: marketCapArray,
        backgroundColor: colorArray,
        hoverBackgroundColor: colorArray,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{chartTitle}</h2>
        <Pie data={globalTotalMarketCap} width={50} height={50} />
      </div>
    </div>
  );
};

export default ChartGlobalTotalMarketCap;
