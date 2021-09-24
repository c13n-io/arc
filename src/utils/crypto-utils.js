const parseCurrentFunds = (props) => {
  if (props.currentFunds !== -1 && props.selectedCryptoUnit) {
    let cryptoRate;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      cryptoRate = 1;
      return Number(props.currentFunds / cryptoRate).toFixed(0);
    case 'msat':
      cryptoRate = 0.001;
      return Number(props.currentFunds / cryptoRate).toFixed(0);
    case 'mBTC':
      cryptoRate = 100000;
      return Number(props.currentFunds / cryptoRate).toFixed(5);
    }
  }
  return 0;
};

const parseLastFundChange = (props) => {
  if (props.lastFundChange !== 0 && props.selectedCryptoUnit) {
    let cryptoRate;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      cryptoRate = 1;
      return Number(props.lastFundChange / cryptoRate).toFixed(0);
    case 'msat':
      cryptoRate = 0.001;
      return Number(props.lastFundChange / cryptoRate).toFixed(0);
    case 'mBTC':
      cryptoRate = 100000;
      return Number(props.lastFundChange / cryptoRate).toFixed(5);
    }
  }
  return '';
};

const parseCurrentFiatAmount = (props) => {
  if (props.selectedFiatUnit && props.exchangeRates && props.currentFunds !== -1) {
    let rate = props.exchangeRates[props.selectedFiatUnit];
    let btc = props.currentFunds / 100000000;
    return Number(btc * rate).toFixed(2);
  }
  return 0;
};

const msatToCurrentCryptoUnit = (props, amount) => {
  if (props.selectedCryptoUnit) {
    let cryptoRate;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      cryptoRate = 1000;
      return Number(amount / cryptoRate);
    case 'msat':
      return amount;
    case 'mBTC':
      cryptoRate = 100000000;
      return Number(amount / cryptoRate).toFixed(5);
    }
  }
  return amount;
};

const satToCurrentCryptoUnit = (props, amount) => {
  if (props.selectedCryptoUnit) {
    let cryptoRate;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      cryptoRate = 1;
      return Number(amount / cryptoRate);
    case 'msat':
      cryptoRate = 0.001;
      return Number(amount / cryptoRate);
    case 'mBTC':
      cryptoRate = 100000;
      return Number(amount / cryptoRate).toFixed(5);
    }
  }
  return amount;
};

const currentCryptoAmtToFiat = (props, amount) => {
  if (props.selectedCryptoUnit && props.selectedFiatUnit && props.exchangeRates) {
    let satAmt;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      satAmt = amount;
      break;
    case 'msat':
      satAmt = Number(amount / 1000);
      break;
    case 'mBTC':
      satAmt = Number(amount * 100000).toFixed(5);
      break;
    }
    let rate = props.exchangeRates[props.selectedFiatUnit];
    let btc = satAmt / 100000000;
    return Number(btc * rate).toFixed(6);
  }
  return 0;
};

const msatAmtToFiat = (props, amount) => {
  if (props.selectedFiatUnit && props.exchangeRates) {
    let satAmt = amount / 1000;
    let rate = props.exchangeRates[props.selectedFiatUnit];
    let btc = satAmt / 100000000;
    return Number(btc * rate).toFixed(6);
  }
  return 0;
};

const currentCryptoAmtToMsat = (props, amount) => {
  if (props.selectedCryptoUnit) {
    let msatAmt;
    switch (props.selectedCryptoUnit) {
    case 'sat':
      msatAmt = Number(amount * 1000);
      break;
    case 'msat':
      msatAmt = amount;
      break;
    case 'mBTC':
      msatAmt = Number(amount * 100000000);
      break;
    }
    return msatAmt;
  }
  return amount;
};

const retrieveDefaultCryptoAmount = (props) => {
  switch (props.selectedCryptoUnit) {
  case 'sat':
    return'1';
  case 'msat':
    return'1000';
  case 'mBTC':
    return'0.00001';
  }
};

const selectedCryptoToVerbose = (unit) => {
  switch (unit) {
  case 'sat':
    return 'satoshis';
  case 'msat':
    return 'millisats';
  case 'mBTC':
    return 'mBTC';
  }
};

export {
  parseCurrentFunds,
  parseLastFundChange,
  parseCurrentFiatAmount,
  msatToCurrentCryptoUnit,
  satToCurrentCryptoUnit,
  currentCryptoAmtToFiat,
  currentCryptoAmtToMsat,
  msatAmtToFiat,
  retrieveDefaultCryptoAmount,
  selectedCryptoToVerbose
};
