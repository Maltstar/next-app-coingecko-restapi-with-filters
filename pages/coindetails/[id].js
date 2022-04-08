import Layout from '@/components/Layout';
import BarchartGeneralScore from '@/components/charts/BarchartGeneralScore';
import ChartDeveloperData from '@/components/charts/ChartDeveloperData';
import LineChart30DayPrices from '@/components/charts/LineChart30DayPrices';
import Link from 'next/link';

// API Fetch Data for Single Coin - general Stuff
export async function getServerSideProps(context) {
  const { id } = context.query;
  const baseUrl = 'https://api.coingecko.com/api/v3';

  const res = await fetch(`${baseUrl}/coins/${id}`);
  const res2 = await fetch(
    `${baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );
  const res3 = await fetch(`${baseUrl}/coins/${id}?market_data=true`);
  const coinMetrics = await res.json();
  const priceChart = await res2.json();
  const priceChange = await res3.json();
  return {
    props: {
      coin: coinMetrics,
      priceChart: priceChart,
      priceChange: priceChange,
    },
  };
}

const Coindetails = ({ coin, priceChart, priceChange }) => {
  const description = coin.description.en;
  const isGenesisDate = coin.genesis_date;
  const isHomepage = coin.links.homepage;

  //Percentage Change in Percent
  const price7Days = priceChange.market_data.price_change_percentage_7d;
  const price14Days = priceChange.market_data.price_change_percentage_14d;
  const price30Days = priceChange.market_data.price_change_percentage_30d;

  // Sanitize String
  const toSanitize = isHomepage.toString();
  const isHomepageSanitized = toSanitize.substring(0, toSanitize.length - 2);

  const prices = priceChart.prices;

  return (
    <Layout
      title={`${coin.id} | Genesis-Date: ${
        isGenesisDate ? isGenesisDate : 'N/A'
      }`}
    >
      <div className="flex-container">
        <ul>
          <div
            className="spaced-text"
            dangerouslySetInnerHTML={{
              __html: description.replace(/href/g, "target='_blank' href"),
            }}
          />

          <div className="simple-divider">
            {' '}
            <h4>
              Weiterführende Informationen auf:{' '}
              <Link
                href={`https://coinmarketcap.com/currencies/${coin.id.toLowerCase()}/`}
              >
                <a target="_blank">Coinmarketcap</a>
              </Link>
            </h4>
            <h4>
              Handel über Binance und Möglichkeit der Techischen Analyse:{' '}
              <Link
                href={`https://www.binance.com/en/trade/${coin.symbol.toUpperCase()}_BUSD`}
              >
                <a target="_blank">Binance</a>
              </Link>
            </h4>
          </div>

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
          chartTitle="Reputationscore in %"
          singleCryptoStats={coin}
        />

        <ChartDeveloperData
          chartTitle="Entwickler Statistik (Abs. Zahlen)"
          singleCryptoStats={coin}
        />
      </div>
      <div className="flex-column">
        <div className="simple-divider">
          <h2 className="text-center">
            {' '}
            Preisveränderung: 7 Tage: {price7Days}% | 14 Tage: {price14Days}% |
            30 Tage: {price30Days}%{' '}
          </h2>
        </div>
      </div>
      <div className="flex-container">
        <LineChart30DayPrices
          chartTitle="Tageschart der letzten 30 Tage"
          priceChart={priceChart}
        />
      </div>
    </Layout>
  );
};

export default Coindetails;
