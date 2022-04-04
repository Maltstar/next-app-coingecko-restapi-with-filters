import Layout from '@/components/Layout';
import BarchartGeneralScore from '@/components/charts/BarchartGeneralScore';
import ChartDeveloperData from '@/components/charts/ChartDeveloperData';
import LineChart14DayPrices from '@/components/charts/LineChart14DayPrices';
import dompurify from 'dompurify';

// API Fetch Data for Single Coin - general Stuff
export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  const res2 = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );
  const data = await res.json();

  const priceChart = await res2.json();
  return {
    props: {
      coin: data,
      priceChart: priceChart,
    },
  };
}

const Coindetails = ({ coin, priceChart }) => {
  const description = coin.description.en;
  const sanitizer = dompurify.sanitize;
  const isGenesisDate = coin.genesis_date;
  const developerData = coin.developer_data;
  const isHomepage = coin.links.homepage;

  const prices = priceChart.prices;
  //console.log(prices);
  //console.log(developerData);

  // tried purifying hrefs. doesnt work: https://linguinecode.com/post/complete-guide-react-dangerouslysetinnerhtml
  //dangerouslySetInnerHTML={{ __html: sanitizer(description) }}
  return (
    <Layout
      title={`${coin.id} | Genesis-Date: ${
        isGenesisDate ? isGenesisDate : 'N/A'
      }`}
    >
      <div className="flex-container">
        <p>{description}</p>
        <ul>
          <li>Offizielle Website: {isHomepage ? isHomepage : 'Website N/A'}</li>
        </ul>
      </div>
      <div className="flex-container">
        <BarchartGeneralScore
          chartTitle="General Score in %"
          singleCryptoStats={coin}
        />

        <ChartDeveloperData
          chartTitle="Entwickler Statistik (Abs. Zahlen)"
          singleCryptoStats={coin}
        />
      </div>
      <div className="flex-container">
        <LineChart14DayPrices
          chartTitle="Preisentwicklung: 30 Tage"
          priceChart={priceChart}
        />
      </div>
    </Layout>
  );
};

export default Coindetails;
