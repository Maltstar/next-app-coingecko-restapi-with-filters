import Link from 'next/link';
import Chart from 'chart.js/auto';

// ChartJS Modifications need to be applied here.
Chart.defaults.color = '#fff';
Chart.defaults.responsive = true;

export default function CoinsList({ coinsData, currency }) {
  return (
    <div className="table-card">
      <table id="currencyTable">
        <thead>
          <tr>
            <th>Logo</th>
            <th>CurrencyName</th>
            <th>TickerSymbol</th>
            <th>Current Price</th>
            <th>All-time High</th>
            <th>Optionen</th>
          </tr>
        </thead>
        <tbody>
          {coinsData.map((singleEntry) => (
            <tr key={singleEntry.id + 1}>
              <td>
                <img
                  src={singleEntry.image}
                  width={25}
                  height={25}
                  alt={`coinname-${singleEntry.id}`}
                />
              </td>
              <td>{singleEntry.name}</td>
              <td>{singleEntry.symbol.toUpperCase()}</td>
              <td>
                {singleEntry.current_price} {currency ? '€' : '$'}
              </td>
              <td>
                {singleEntry.ath} {currency ? '€' : '$'}
              </td>

              <td>
                <button id={singleEntry.id} className="custom-btn btn-1">
                  <Link href={`/coindetails/${singleEntry.id.toLowerCase()}`}>
                    <a>Details</a>
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
