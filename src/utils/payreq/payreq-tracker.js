import paymentClient from "../../services/paymentServices";

let paidPayreqs = {};
let myPaidPayreqs = {};

const registerPaidPayreq = (payreq) => {
  paidPayreqs[payreq] = true;
};

const checkPayreq = (payreq) => {
  return paidPayreqs[payreq] == true;
};

const checkMyPayreq = async (payreq) => {
  if(myPaidPayreqs[payreq] == true) {
    return true;
  }
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
      }
    }
  );

};

export {
  registerPaidPayreq,
  checkPayreq,
  checkMyPayreq
};