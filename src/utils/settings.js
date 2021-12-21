const loadAutomaticImageLoadingSetting = (setAutomaticImageLoading) => {
  let res = window.localStorage.getItem('automaticImageLoadingSetting');
  setAutomaticImageLoading(res !== 'false');
};

const saveAutomaticImageLoadingSetting = (setAutomaticImageLoading, value) => {
  window.localStorage.setItem('automaticImageLoadingSetting', value);
  setAutomaticImageLoading(value);
};

const loadSmoothAnimationsSetting = (setSmoothAnimations) => {
  let res = window.localStorage.getItem('smoothAnimationsSetting');
  setSmoothAnimations(res !== 'false');
};

const saveSmoothAnimationsSetting = (setSmoothAnimations, value) => {
  window.localStorage.setItem('smoothAnimationsSetting', value);
  setSmoothAnimations(value);
};

const loadSelectedCryptoUnit = (setSelectedCryptoUnit) => {
  let res = window.localStorage.getItem('selectedCryptoUnitSetting');
  if (res === 'sat' || res === 'msat' || res === 'mBTC') {
    setSelectedCryptoUnit(res);
  } else {
    setSelectedCryptoUnit('sat');
  }
};

const saveSelectedCryptoUnit = (setSelectedCryptoUnit, value) => {
  window.localStorage.setItem('selectedCryptoUnitSetting', value);
  setSelectedCryptoUnit(value);
};

const loadSelectedFiatUnit = (setSelectedFiatUnit) => {
  let res = window.localStorage.getItem('selectedFiatUnitSetting');
  if (res === 'EUR' || res === 'USD') {
    setSelectedFiatUnit(res);
  } else {
    setSelectedFiatUnit('EUR');
  }
};

const saveSelectedFiatUnit = (setSelectedFiatUnit, value) => {
  window.localStorage.setItem('selectedFiatUnitSetting', value);
  setSelectedFiatUnit(value);
};

const loadChatIdenticonsSetting = (setChatIdenticons) => {
  let res = window.localStorage.getItem('chatIdenticonsSetting');
  setChatIdenticons(res !== 'false');
};

const saveChatIdenticonsSetting = (setChatIdenticons, value) => {
  window.localStorage.setItem('chatIdenticonsSetting', value);
  setChatIdenticons(value);
};

const loadChatLayoutSetting = (setChatLayout) => {
  let res = window.localStorage.getItem('chatLayoutSetting');
  if (res === 'normal' || res === 'left' || res === 'right') {
    setChatLayout(res);
  } else {
    setChatLayout('normal');
  }
};

const saveChatLayoutSetting = (setChatLayout, value) => {
  window.localStorage.setItem('chatLayoutSetting', value);
  setChatLayout(value);
};

const loadMyMessageColor = (setMyMessageColor) => {
  let res = window.localStorage.getItem('myMessageColorSetting');
  if(res !== 'undefined' && res !== undefined && res !== null) {
    setMyMessageColor(res);
  } else {
    setMyMessageColor('darkslategrey');
  }
};

const saveMyMessageColor = (setMyMessageColor, value) => {
  window.localStorage.setItem('myMessageColorSetting', value);
  setMyMessageColor(value);
};

const loadOtherMessageColor = (setOtherMessageColor) => {
  let res = window.localStorage.getItem('otherMessageColorSetting');
  if(res !== 'undefined' && res !== undefined && res !== null) {
    setOtherMessageColor(res);
  } else {
    setOtherMessageColor('sienna');
  }
};

const saveOtherMessageColor = (setOtherMessageColor, value) => {
  window.localStorage.setItem('otherMessageColorSetting', value);
  setOtherMessageColor(value);
};

const loadDeveloperLogsSetting = (setDeveloperLogs) => {
  let res = window.localStorage.getItem('developerLogsSetting');
  setDeveloperLogs(res === 'true');
  if(res !== 'true') {
    console.log('Production mode');
    console.log = function() {};
  }
};

const saveDeveloperLogsSetting = (setDeveloperLogs, value) => {
  window.localStorage.setItem('developerLogsSetting', value);
  setDeveloperLogs(value);
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
  loadDeveloperLogsSetting,
  saveAutomaticImageLoadingSetting,
  saveSmoothAnimationsSetting,
  saveSelectedCryptoUnit,
  saveSelectedFiatUnit,
  saveChatIdenticonsSetting,
  saveChatLayoutSetting,
  saveMyMessageColor,
  saveOtherMessageColor,
  saveDeveloperLogsSetting
};