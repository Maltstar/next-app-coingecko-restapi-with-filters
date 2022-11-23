import { useState, useEffect } from 'react';
import PiechartMarketCap from '@/components/charts/PiechartMarketCap';
import BarchartCirculatingSupply from '@/components/charts/BarchartCirculatingSupply';
import BarchartAthChange from '@/components/charts/BarchartAthChange';
import PiechartTradeVolume from '@/components/charts/PiechartTradeVolume';

export default function Charts({coinsData,search}) 
{


    const [filteredCoins, setFilteredCoin] = useState([]);
    const UpdatefilteredCoins = ((coinsData,search) => setFilteredCoin(coinsData.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()))));

    useEffect(()=>
    {
        UpdatefilteredCoins(coinsData,search);
        console.log("UpdatefilteredCoins");
        console.log(UpdatefilteredCoins);
        console.log('search');
        console.log(search);
    },[coinsData,search]);

    
    return(
    <>
        <div className="flex-container">
            <PiechartMarketCap
                chartTitle="Marktkapitalisierung (Abs. Zahlen)"
                cryptos={filteredCoins}
            />
            <BarchartCirculatingSupply
                chartTitle="Umlaufmenge (Abs. Zahlen)"
                cryptos={filteredCoins}
            />
        </div>
    <div className="flex-container">
        <BarchartAthChange
            title="ATH Veränderung in %"
            cryptos={filteredCoins}
        />
        <PiechartTradeVolume
            title="Aktuelles Handelsvolumen (Abs. Zahlen)"
            cryptos={filteredCoins}
        />
    </div>
  </>
    )
}