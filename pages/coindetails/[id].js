import Layout from '@/components/Layout';
import BarchartGeneralScore from '@/components/charts/BarchartGeneralScore';
import ChartDeveloperData from '@/components/charts/ChartDeveloperData';

// API Fetch Data for Single Coin
export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}
  `);
  const data = await res.json();
  return {
    props: {
      coin: data,
    },
  };
}

const Coindetails = ({ coin }) => {
  return (
    <Layout title={`${coin.id} | Genesis-Date: ${coin.genesis_date}`}>
      <div className="flex-container">
        <p>{coin.description.en}</p>
        <ul>
          <li>Offizielle Website: {coin.links.homepage}</li>
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
    </Layout>
  );
};

export default Coindetails;
