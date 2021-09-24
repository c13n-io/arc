let payreqs = {};

const issuePayreq = (id) => {
  if(!(id in payreqs)) {
    payreqs[id] = false;
  }
};

const satisfyPayreq = (id) => {
  payreqs[id] = true;
};

const checkPayreq = (id) => {
  if(id in payreqs) {
    return payreqs[id];
  } else {
    return false;
  }
};

export {
  issuePayreq,
  satisfyPayreq,
  checkPayreq
};