const https = require('https');

const getExchangeRates = (setExchangeRates) => {
  let data = '';
  https.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC', (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      let res = JSON.parse(data);
      setExchangeRates(res.data.rates);
    });
  }).on('error', (err) => {
    console.error(err);
  });
};

export default getExchangeRates;
