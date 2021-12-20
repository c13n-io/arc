/**
 * This function returns the currently selected account's URL.
 * @return {string} The URL.
 */
const url = () => {
  return window.localStorage.getItem('url');
};
/**
 * This function assembles the backend rpc API URL based on current selected backend location.
 * @returns The string representing the API URL.
 */
const apiUrl = () => {
  return `${url()}/c13n-grpc`;
};

export default apiUrl;
