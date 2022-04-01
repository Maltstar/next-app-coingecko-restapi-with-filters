export function getFormattedPrice(price, currencySymbol = ' $') {
  const formattedPrice =
    (price / 1).toFixed(2).replace('.', ',') + currencySymbol;

  return formattedPrice;
}

// Source: https://www.30secondsofcode.org/js/s/shuffle
export function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

/* Die exakte Berechnung der Distanz zwischen zwei Koordinaten ist nicht ganz trivial, da
die Erde keine perfekte Kugel ist. Für die meisten Anwendungsfälle liefert die
"Haversine-Formel" ausreichend genaue Ergebnisse. Hier eine leicht angepasste
Version dieser Implementierung: http://www.geodatasource.com/developers/javascript
Auf der Seite findet man auch Versionen für andere Sprachen, z.B. PHP. */
export function getDistance(lat1, lon1, lat2, lon2, unit = 'K') {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515; // Ergibt Entfernung in Meilen
  // Ggf. Umrechnung in Kilometer oder nautische Meilen
  if (unit == 'K') {
    dist = dist * 1.609344;
  } else if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

// Added Helperfunctions to convert Big Numbers into readable Format - added 30.03.2022
// Add Libs: https://openbase.com/js/numbro // https://numbrojs.com/format.html
// Formats Number to thousands
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + 'k'
    : Math.sign(num) * Math.abs(num);
}

// converts number to string representation with K and M.
// toFixed(d) returns a string that has exactly 'd' digits
// after the decimal place, rounding if necessary.
function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'm'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}
