/**
   * This function adds an account to the local storage.
   * @param {*} account Object containing account information
   */
const addToAccounts = (props, account) => {
  let res = props.accounts.filter((elem) => {
    return elem.url !== account.url;
  });
  props.setAccounts((oldAccounts) => {
    res.push(account);
    saveAccounts(res);
    return res;
  });
};

/**
   * This function removes an account from the local storage.
   * @param {*} account Object containing account information
   */
const removeFromAccounts = (props, account) => {
  let res = props.accounts.filter((elem) => {
    return elem.url !== account.url;
  });
  props.setAccounts(res);
  saveAccounts(res);
};

/**
   * This function loads the accounts saves in local storage.
   */
const loadAccounts = (props) => {
  let res = window.localStorage.getItem('accounts');
  if (res) {
    props.setAccounts(JSON.parse(res));
  }
};

/**
   * This function saves the accounts array in local storage.
   * @param {*} accountsArray The accounts array.
   */
const saveAccounts = (accountsArray) => {
  console.log("Savving to accounts", accountsArray);
  window.localStorage.setItem('accounts', JSON.stringify(accountsArray));
};

export {
  addToAccounts,
  removeFromAccounts,
  loadAccounts,
  saveAccounts
};