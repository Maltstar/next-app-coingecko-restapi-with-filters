import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

/** colors are from: https://coolors.co/palettes/trending */
const PolarchartDetail = ({ chartTitle, singleCryptoStats }) => {
  //console.log(singleCryptoStats.developer_score);

  const scoreMetrics = {
    labels: [''],
    datasets: [
      {
        label: 'coingecko_score',
        data: [singleCryptoStats.coingecko_score],
        backgroundColor: '#79addc',
      },
      {
        label: 'developer_score',
        data: [singleCryptoStats.developer_score],
        backgroundColor: '#ffc09f',
      },
      {
        label: 'community_score',
        data: [singleCryptoStats.community_score],
        backgroundColor: '#ffee93',
      },
      {
        label: 'liquidity_score',
        data: [singleCryptoStats.liquidity_score],
        backgroundColor: '#fcf5c7',
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
        <Bar data={scoreMetrics} width={50} height={50} />
      </div>
    </div>
  );
};

export default PolarchartDetail;
