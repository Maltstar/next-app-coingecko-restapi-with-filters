import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chartTitle, priceChart }) => {
  //Helper Variable to get Array and run forEach through it
  const prices = priceChart.prices;

  // forEach: cycle through array and split values into two arraysS
  const timeDateArray = [];
  const dailyPrice = [];

  prices.forEach((coin) => {
    // store unixTimeStamp to newDate object
    const dateObject = new Date(coin[0]);

    const options = {
      //weekday: 'long',
      //year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    //make it more readable with toLocaleString.
    const readableDate = dateObject.toLocaleString('de-DE', options);

    //console.log(date.toLocaleString('de-DE', options));

    timeDateArray.push(readableDate);
    dailyPrice.push(coin[1]);
  });

  const convertedDate = new Date(timeDateArray);
  //console.log(convertedDate);

  // colors are from: https://coolors.co/palettes/trending
  const priceDevelopment = {
    labels: timeDateArray,
    datasets: [
      {
        label: 'Preisentwicklung',
        fill: false,
        lineTension: 0.05,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dailyPrice,
      },
    ],
  };

  return (
    <div className="flex-item">
      <div className="card">
        <h2 className="text-centered">{chartTitle}</h2>
        <Line data={priceDevelopment} width={50} height={50} />
      </div>
    </div>
  );
};

export default LineChart;
