NextJS App to consume Coingecko API and output Cryptocurrency Metrics.

## How to run the Project

Just the basics. 
First, install the necessary packages with npm:

```bash
npm install
# or
yarn install
```

Second, 

run the development server:
```bash
npm run dev
# or
yarn dev
```
or run a production build and serve the webapp:
run the development server:
```bash
npm run serve
# or
yarn serve
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Description

This is a fork from the original project https://github.com/LohremYpsum/next-app-coingecko-restapi  realised in collaboration with LohremYpsum https://github.com/LohremYpsum and mfgich https://github.com/mfgich.

The original project aimed to gather some insights through visualizing CryptoData from (open) Coingecko Endpoints and gain experience with React.
More about the: [Coingecko-API](https://www.coingecko.com/de/api/documentation?)

I was responsible for the gridview "GRIDANSICHT".

Now with this fork, some functionnalities were added to make it more user friendly, adding some filters/sorting functionalities and the possibility to load all coins at once on the grid view.


There are 2 pages to view the different coins with their metrics:
 - the first with:
    + a cryptos listing implemented by a standard array with pagination
    + entries to be displayed per page (10-250)
    + with associated charts/details 
    
 - the second with:
    + a cryptos listing implemented via grid with filters
    + entries to be displayed per page (10-5000) with pagination
    + button to load all coins at once (250*53=13250), (can be usefull to sort a lot cryptos
      with the different filters (NAME, PRICE, MARKETCAP, ATH, 1d%, 7d%, 30%) on a single page)

Data have been visualized via [Chartjs](https://www.chartjs.org/docs/latest/getting-started/installation.html)

Data have been vizualized, sorted via [Gridjs](https://gridjs.io/docs/install/)

Icons are implemented via [React-Icons](https://react-icons.github.io/react-icons/)

Colorschemes are taken from: [https://coolors.co](https://coolors.co/palettes/trending)

## Deployed on Vercel

Deployment was created with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
