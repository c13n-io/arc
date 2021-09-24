const concatUserNames = (props, users) => {
  let res = '';
  users.forEach((elem) => {
    if (elem !== undefined) {
      let contactName = findContactName(props, elem);
      let alias = findAlias(props, elem);
      if (contactName.length > 0) {
        res = res.concat(contactName);
        res = res.concat(',');
      } else if (alias.length > 0) {
        res = res.concat(alias);
        res = res.concat(',');
      } else {
        res = res.concat(elem.substring(0, 5));
        res = res.concat(',');
      }
    }
  });
  res = res.slice(0, -1);
  return res;
};

const concatUserAddresses = (props, users) => {
  let res = '';
  users.forEach((elem) => {
    if (elem.length > 0) {
      res = res.concat(elem);
      res = res.concat(',');
    } else {
      res = res.concat('Unknown');
      res = res.concat(',');
    }
  });
  if (res !== '') {
    res = res.slice(0, -1);
  }
  return res;
};

/**
   * This function returns the contact name for a specific address.
   * @param {string} item The address.
   */
const findContactName = (props, item) => {
  let lookup;
  if (props.contacts) {
    lookup = props.contacts.find((elem) => {
      return elem.user.address === item;
    });
  }
  if (lookup) {
    return lookup.displayName;
  } else {
    return '';
  }
};

/**
 * This function returns the friendly name and alias pair for a given address.
 * @param {string} item The address.
 */
const findAlias = (props, item) => {
  let userLookup;
  if (props.users) {
    userLookup = props.users.find((elem) => {
      return elem.address === item;
    });
  }
  if (userLookup) {
    return userLookup.alias;
  } else {
    return '';
  }
};

const routesToAddresses = (routes) => {
  let addressArray = [];
  if (routes !== undefined) {
    routes.forEach((route) => {
      let lastHop = route.hopsList[route.hopsList.length - 1];
      addressArray.push(lastHop.hopAddress);
    });
  }
  return addressArray;
};

const populateChatHistoryMetadata = (chatHistory) => {
  let previousElem = undefined;
  chatHistory.forEach((elem) => {
    elem['merge'] = false;
    if (previousElem !== undefined) {
      if (previousElem.sender === elem.sender
        && elem.sentTimestamp.seconds < previousElem.sentTimestamp.seconds + 60) {
        elem['merge'] = true;
      }
    }
    previousElem = elem;
  });
};

const appendToChatHistory = (props, message) => {
  props.setChatHistory(
    (oldHistory) => {
      let previousElem = oldHistory[oldHistory.length - 1];
      message['merge'] = false;
      if (previousElem !== undefined) {
        if (previousElem.sender === message.sender
          && message.sentTimestamp.seconds < previousElem.sentTimestamp.seconds + 60) {
          message['merge'] = true;
        }
      }
      return oldHistory.concat(message);
    }
  );
};

export {
  concatUserAddresses,
  concatUserNames,
  findContactName,
  findAlias,
  routesToAddresses,
  populateChatHistoryMetadata,
  appendToChatHistory
};