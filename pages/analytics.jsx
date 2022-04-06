import React from 'react';
import Layout from '@/components/Layout';
import ChartGlobalTotalMarketCap from '@/components/charts/ChartGlobalTotalMarketCap';

export default function coins({ globalData }) {
  return (
    <Layout title="Global Analytics: Top 10">
      <div className="flex-container">
        <ChartGlobalTotalMarketCap
          chartTitle="Absolute Marktkapitalisierung"
          globalCryptoStats={globalData}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/global/');

  const globalData = await res.json();
  console.log(globalData);

  return {
    props: {
      globalData: globalData,
    },
  };
};
