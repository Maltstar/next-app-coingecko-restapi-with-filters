import Layout from '@/components/Layout';
import PolarchartDetail from '@/components/PolarchartDetail';
import ChartDeveloperData from '@/components/ChartDeveloperData';

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
    <Layout title={coin.id}>
      <div className="flex-container">
        {/* <div className="singleview-card">
          <h4>
            <b>{coin.symbol}</b>
          </h4>
          <p>{coin.description.en}</p>
        </div>
         <div className="singleview-card">
          <h4>
            <b>Stats</b>
          </h4>
          <p>
            Genesis Date: <b> {coin.genesis_date}</b>
          </p>
          <p>Offizielle Website: {coin.links.homepage}</p>
        </div> */}
        <PolarchartDetail chartTitle="General Score" singleCryptoStats={coin} />
        <ChartDeveloperData
          chartTitle="Developer Stats"
          singleCryptoStats={coin}
        />
      </div>
    </Layout>
  );
};

export default Coindetails;
