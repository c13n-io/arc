import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  LookupInvoiceRequest,
  LookupInvoiceResponse
} = require("../rpc/rpc_pb");

const { PaymentServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new PaymentServiceClient(apiUrl(), {});

const client = new Object();

client.createInvoice = (req, callback) => {
  const request = new CreateInvoiceRequest();
  request.setMemo(req.description);
  request.setAmtMsat(req.amtMsat);
  request.setExpiry(req.expiry);
  request.setPrivate(req.private);
  return rpcClient.createInvoice(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? CreateInvoiceResponse.toObject(true, res) : undefined)
  );
};

client.lookupInvoice = (req, callback) => {
  const request = new LookupInvoiceRequest();
  request.setPayReq(req.payReq);
  return rpcClient.lookupInvoice(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? LookupInvoiceResponse.toObject(true, res) : undefined)
  );
};

const paymentClient = () => {
  return client;
};

export default paymentClient;
