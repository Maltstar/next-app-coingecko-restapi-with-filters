import Layout from '@/components/Layout';
import BarchartGeneralScore from '@/components/charts/BarchartGeneralScore';
import ChartDeveloperData from '@/components/charts/ChartDeveloperData';
import LineChart30DayPrices from '@/components/charts/LineChart30DayPrices';

// API Fetch Data for Single Coin - general Stuff
export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await res.json();
  const res2 = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );
  const priceChart = await res2.json();
  const res3 = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true`
  );

  const priceChange = await res3.json();
  return {
    props: {
      coin: data,
      priceChart: priceChart,
      priceChange: priceChange,
    },
  };
}

const Coindetails = ({ coin, priceChart, priceChange }) => {
  const description = coin.description.en;
  const isGenesisDate = coin.genesis_date;
  const developerData = coin.developer_data;
  const isHomepage = coin.links.homepage;

  //Percentage Change in Percent
  const price7Days = priceChange.market_data.price_change_percentage_7d;
  const price14Days = priceChange.market_data.price_change_percentage_14d;
  const price30Days = priceChange.market_data.price_change_percentage_30d;

  console.log(price7Days);
  console.log(price14Days);
  console.log(price30Days);

  // Sanitize String
  const str = isHomepage.toString();
  const isHomepageSanitized = str.substring(0, str.length - 2);

  const prices = priceChart.prices;

  return (
    <Layout
      title={`${coin.id} | Genesis-Date: ${
        isGenesisDate ? isGenesisDate : 'N/A'
      }`}
    >
      <div className="flex-container">
        <ul>
          Preisveränderung: 7 Tage: {price7Days}% | 14 Tage: {price14Days}% | 30
          Tage: {price30Days}%
          <div
            className="spaced-text"
            dangerouslySetInnerHTML={{
              __html: description.replace(/href/g, "target='_blank' href"),
            }}
          />
          <br />
          <div>
            Offizielle Website:{' '}
            <a
              href={isHomepageSanitized ? isHomepageSanitized : 'Website N/A'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isHomepageSanitized ? isHomepageSanitized : 'Website N/A'}
            </a>
          </div>
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
        <LineChart30DayPrices
          chartTitle="Preisentwicklung: 30 Tage"
          priceChart={priceChart}
        />
      </div>
    </Layout>
  );
};

export default Coindetails;
