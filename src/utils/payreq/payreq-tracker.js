import paymentClient from "../../services/paymentServices";

let paidPayreqs = {};
let myPaidPayreqs = {};

const registerPaidPayreq = (payreq) => {
  paidPayreqs[payreq] = true;
};

const checkPayreq = (payreq) => {
  return paidPayreqs[payreq] == true;
};

const checkMyPayreq = (payreq) => {
  if(myPaidPayreqs[payreq] == true) {
    return true;
  } else {
    paymentClient().lookupInvoice(
      {
        payReq: payreq
      },
      (err, res) => {
        if(err) {
          console.log(err);
        }
        if(res) {
          console.log(res);
          if(res?.invoice?.state == 2) {
            myPaidPayreqs[payreq] = true;
          }
        }
      }
    );
    return false;
  }
};

export {
  registerPaidPayreq,
  checkPayreq,
  checkMyPayreq
};