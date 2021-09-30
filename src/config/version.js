import nodeInfoClient from "../services/nodeInfoServices";
/**
 * The FE application version.
 */
const version = "0.0.2";

/**
 * Acquires the returned backend version.
 * @param {*} setBackendVersion The setter of the state variable representing the version (used to acquire the value asynchronously).
 */
const getBackendVersion = (setBackendVersion) => {
  nodeInfoClient.getVersion({}, (err, res) => {
    if (err) {
      return setBackendVersion("invalid");
    }
    if (res) {
      if (res.version) {
        return setBackendVersion(res.version);
      } else {
        return setBackendVersion("invalid");
      }
    }
  });
};

export { version, getBackendVersion };
