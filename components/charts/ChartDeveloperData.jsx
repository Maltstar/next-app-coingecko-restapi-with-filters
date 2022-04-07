import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

/** colors are from: https://coolors.co/palettes/trending */
const ChartDeveloperData = ({ chartTitle, singleCryptoStats }) => {
  const scoreMetrics = {
    labels: [''],
    datasets: [
      {
        label: 'Forks',
        data: [singleCryptoStats.developer_data.forks],
        backgroundColor: '#f4a261',
      },
      {
        label: 'Stars',
        data: [singleCryptoStats.developer_data.stars],
        backgroundColor: '#264653',
      },
      {
        label: 'Subscribers',
        data: [singleCryptoStats.developer_data.subscribers],
        backgroundColor: '#2a9d8f',
      },
      {
        label: 'Issues(Total)',
        data: [singleCryptoStats.developer_data.total_issues],
        backgroundColor: '#e9c46a',
      },
      {
        label: 'Issues(closed)',
        data: [singleCryptoStats.developer_data.closed_issues],
        backgroundColor: '#e76f51',
      },
      {
        label: 'Merged Pullrequests',
        data: [singleCryptoStats.developer_data.pull_requests_merged],
        backgroundColor: '#d4e09b',
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

export default ChartDeveloperData;
