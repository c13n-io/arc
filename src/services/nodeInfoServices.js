import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const {
  VersionRequest,
  Version,
  SelfInfoRequest,
  SelfInfoResponse,
  SelfBalanceRequest,
  SelfBalanceResponse,
  GetNodesRequest,
  NodeInfoResponse,
  SearchNodeByAddressRequest,
  SearchNodeByAliasRequest,
  ConnectNodeRequest,
  ConnectNodeResponse,
} = require("../rpc/rpc_pb");
const { NodeInfoServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new NodeInfoServiceClient(apiUrl(), {});

const client = new Object();

client.getVersion = (req, meta, callback) => {
  const request = new VersionRequest();
  return rpcClient.getVersion(
    request,
    { ...authCreds(), ...meta },
    (err, res) => callback(err, res ? Version.toObject(true, res) : undefined)
  );
};

client.getSelfInfo = (req, meta, callback) => {
  const request = new SelfInfoRequest();
  return rpcClient.getSelfInfo(
    request,
    { ...authCreds(), ...meta },
    (err, res) =>
      callback(err, res ? SelfInfoResponse.toObject(true, res) : undefined)
  );
};

client.getSelfBalance = (req, callback) => {
  const request = new SelfBalanceRequest();
  return rpcClient.getSelfBalance(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? SelfBalanceResponse.toObject(true, res) : undefined)
  );
};

client.getNodes = (req, callback) => {
  const request = new GetNodesRequest();
  return rpcClient.getNodes(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? NodeInfoResponse.toObject(true, res) : undefined)
  );
};

client.searchNodeByAddress = (req, callback) => {
  const request = new SearchNodeByAddressRequest();
  request.setAddress(req.address);
  return rpcClient.searchNodeByAddress(
    request,
    { ...authCreds() },
    (err, res) =>
      callback(err, res ? NodeInfoResponse.toObject(true, res) : undefined)
  );
};

client.searchNodeByAlias = (req, callback) => {
  const request = new SearchNodeByAliasRequest();
  request.setAlias(req.alias);
  return rpcClient.searchNodeByAlias(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? NodeInfoResponse.toObject(true, res) : undefined)
  );
};

client.connectNode = (req, callback) => {
  const request = new ConnectNodeRequest();
  request.setAddress(req.address);
  request.setHostport(req.hostport);
  return rpcClient.connectNode(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? ConnectNodeResponse.toObject(true, res) : undefined)
  );
};

const nodeInfoClient = () => {
  return client;
};

export default nodeInfoClient;
