export function getFormattedPrice(price, currencySymbol = ' $') {
  const formattedPrice =
    (price / 1).toFixed(2).replace('.', ',') + currencySymbol;

  return formattedPrice;
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
