import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const {
  EstimateMessageRequest,
  EstimateMessageResponse,
  SendMessageRequest,
  SendMessageResponse,
  SubscribeMessageRequest,
  SubscribeMessageResponse,
  MessageOptions,
} = require("../rpc/rpc_pb");

const { MessageServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new MessageServiceClient(apiUrl(), {});

const client = new Object();

client.subscribeMessages = (req) => {
  const request = new SubscribeMessageRequest();
  return rpcClient.subscribeMessages(request, { ...authCreds() });
};

client.estimateMessage = (req, callback) => {
  const request = new EstimateMessageRequest();
  const messageOptions = new MessageOptions();
  messageOptions.setFeeLimitMsat(req?.options?.feeLimitMsat);
  messageOptions.setAnonymous(req?.options?.anonymous);
  request.setOptions(messageOptions);
  request.setDiscussionId(req.discussionId);
  request.setPayload(req.payload);
  request.setAmtMsat(req.amtMsat);

  return rpcClient.estimateMessage(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? EstimateMessageResponse.toObject(true, res) : undefined)
  );
};

client.sendMessage = async (req, callback) => {
  const request = new SendMessageRequest();
  const messageOptions = new MessageOptions();
  messageOptions.setFeeLimitMsat(req?.options?.feeLimitMsat);
  messageOptions.setAnonymous(req?.options?.anonymous);
  request.setOptions(messageOptions);
  request.setDiscussionId(req.discussionId);
  request.setPayload(req.payload);
  request.setAmtMsat(req.amtMsat);
  if (req.preimage) {
    request.setPreimage(req.preimage);
  }
  if (req.payReq) {
    request.setPayReq(req.payReq);
  }

  return rpcClient.sendMessage(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? SendMessageResponse.toObject(res, res) : undefined)
  );
};

const messageClient = () => {
  return client;
};

export default messageClient;
