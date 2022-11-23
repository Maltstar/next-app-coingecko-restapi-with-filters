// import { useState, useEffect } from "react";

// const fetchCoinsdata = async () => {
//     try {
//       // currency is a boolean 
//       // example https://api.coingecko.com/api/v3/coins/markets?&page=53&per_page=250&vs_currency=eur&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?&page=${page}&per_page=${count}&vs_currency=${
//           currency ? 'eur' : 'usd'
//         }&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d%2C30d`,
//       );

//       if (!response.ok) {
//         throw new Error('Fehler beim Laden der Daten!');
//       } else {
//         const jsonData = await response.json();
//         setCryptos(jsonData);
//         setIsLoaded(true);
//         SetloadAllResults(false); // user has a requested  a
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error);
//     }
//   };