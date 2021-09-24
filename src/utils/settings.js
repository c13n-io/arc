const loadAutomaticImageLoadingSetting = (setAutomaticImageLoading) => {
  let res = window.localStorage.getItem('automaticImageLoadingSetting');
  setAutomaticImageLoading(res !== 'false');
};

const loadSmoothAnimationsSetting = (setSmoothAnimations) => {
  let res = window.localStorage.getItem('smoothAnimationsSetting');
  setSmoothAnimations(res !== 'false');
};

const loadSelectedCryptoUnit = (setSelectedCryptoUnit) => {
  let res = window.localStorage.getItem('selectedCryptoUnitSetting');
  if (res === 'sat' || res === 'msat' || res === 'mBTC') {
    setSelectedCryptoUnit(res);
  } else {
    setSelectedCryptoUnit('sat');
  }
};

const loadSelectedFiatUnit = (setSelectedFiatUnit) => {
  let res = window.localStorage.getItem('selectedFiatUnitSetting');
  if (res === 'EUR' || res === 'USD') {
    setSelectedFiatUnit(res);
  } else {
    setSelectedFiatUnit('EUR');
  }
};

const loadChatIdenticonsSetting = (setChatIdenticons) => {
  let res = window.localStorage.getItem('chatIdenticonsSetting');
  setChatIdenticons(res !== 'false');
};

const loadChatLayoutSetting = (setChatLayout) => {
  let res = window.localStorage.getItem('chatLayoutSetting');
  if (res === 'normal' || res === 'left' || res === 'right') {
    setChatLayout(res);
  } else {
    setChatLayout('normal');
  }
};

const loadMyMessageColor = (setMyMessageColor) => {
  let res = window.localStorage.getItem('myMessageColorSetting');
  if(res !== 'undefined' && res !== undefined && res !== null) {
    setMyMessageColor(res);
  } else {
    setMyMessageColor('darkslategrey');
  }
};

const loadOtherMessageColor = (setOtherMessageColor) => {
  let res = window.localStorage.getItem('otherMessageColorSetting');
  if(res !== 'undefined' && res !== undefined && res !== null) {
    setOtherMessageColor(res);
  } else {
    setOtherMessageColor('sienna');
  }
};

const loadDeveloperLogsSetting = (setDeveloperLogs) => {
  let res = window.localStorage.getItem('developerLogsSetting');
  setDeveloperLogs(res === 'true');
  if(res !== 'true') {
    console.log('Production mode');
    console.log = function() {};
  }
};

export {
  loadAutomaticImageLoadingSetting,
  loadSmoothAnimationsSetting,
  loadSelectedCryptoUnit,
  loadSelectedFiatUnit,
  loadChatIdenticonsSetting,
  loadChatLayoutSetting,
  loadMyMessageColor,
  loadOtherMessageColor,
  loadDeveloperLogsSetting
};