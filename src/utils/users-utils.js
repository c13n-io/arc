const findUserByAddress = (props, addr) => {
  let userLookup = props.users.find(
    (elem) => {
      return elem.address === addr;
    }
  );
  return userLookup;
};

const splitURI = (URI) => {
  const res = URI.split('@');
  if (res.length===2) {
    return {
      address: res[0],
      hostport: res[1],
      error: ''
    };
  } else {
    return {
      error: 'invalid format'
    };
  }
};

export {
  findUserByAddress,
  splitURI
};