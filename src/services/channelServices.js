import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const { OpenChannelRequest, OpenChannelResponse } = require("../rpc/rpc_pb");
const { ChannelServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new ChannelServiceClient(apiUrl(), {});

const client = new Object();

client.openChannel = (req, callback) => {
  const request = new OpenChannelRequest();
  request.setAddress(req.address ? req.address : "");
  request.setAmtMsat(req.amtMsat ? req.amtMsat : "");
  request.setPushAmtMsat(req.pushAmtMsat ? req.pushAmtMsat : "");
  request.setMinInputConfs(req.minInputConfs ? req.minInputConfs : "");
  request.setTargetConfirmationBlock(
    req.targetConfirmationBlock ? req.targetConfirmationBlock : ""
  );
  return rpcClient.openChannel(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? OpenChannelResponse.toObject(res, res) : undefined)
  );
};

const channelClient = () => {
  return client;
};

export default channelClient;
