import React from 'react';
import Layout from '@/components/Layout';
import CoinsList from '@/components/CoinsList';
import Piechart from '@/components/Piechart';
import Scatterchart from '@/components/Scatterchart';

// Fetch Data from API here. Specified Params are optional.
const apiKey = 'bae3696bc71b304a970bbb31283a571f08be9fc9';
const perPage = '&per-page=15';
const currentPage = '&page=1';

export const getStaticProps = async () => {
  const res = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}${currentPage}${perPage}`
  );
  const coinSamples = await res.json();

  return {
    props: {
      coinSamples: coinSamples,
    },
    revalidate: 300,
  };
};

export default function coins({ coinSamples }) {
  return (
    <Layout title="CoinList">
      <CoinsList allCoins={coinSamples} title="Coins" />
      <div className="flex-container">
        <Piechart cryptos={coinSamples} />
        <Scatterchart cryptos={coinSamples} />
      </div>
    </Layout>
  );
}
