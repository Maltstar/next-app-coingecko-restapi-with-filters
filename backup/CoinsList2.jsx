import Link from 'next/link';
import ChartGlobalTotalMarketCap from '@/components/charts/ChartGlobalTotalMarketCap';

export default function CoinsList2({ ...globalCoins }) {
  return (
    <div className="table-card">
      <ChartGlobalTotalMarketCap />
    </div>
  );
}
