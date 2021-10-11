import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const {
  GetDiscussionsRequest,
  GetDiscussionsResponse,
  GetDiscussionHistoryByIDRequest,
  GetDiscussionHistoryResponse,
  GetDiscussionStatisticsRequest,
  GetDiscussionStatisticsResponse,
  AddDiscussionRequest,
  AddDiscussionResponse,
  UpdateDiscussionLastReadRequest,
  UpdateDiscussionResponse,
  RemoveDiscussionRequest,
  RemoveDiscussionResponse,
  KeySetPageOptions,
  DiscussionInfo,
  DiscussionOptions,
} = require("../rpc/rpc_pb");
const { DiscussionServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new DiscussionServiceClient(apiUrl(), {});

const client = new Object();

client.getDiscussions = (req) => {
  const request = new GetDiscussionsRequest();
  return rpcClient.getDiscussions(request, { ...authCreds() });
};

client.getDiscussionHistoryById = (req) => {
  const request = new GetDiscussionHistoryByIDRequest();
  const keySetPageOptions = new KeySetPageOptions();
  keySetPageOptions.setLastId(req.pageOptions.lastId);
  keySetPageOptions.setPageSize(req.pageOptions.pageSize);
  keySetPageOptions.setReverse(req.pageOptions.reverse);
  request.setPageOptions(keySetPageOptions);
  request.setId(req.id);
  return rpcClient.getDiscussionHistoryByID(request, { ...authCreds() });
};

client.getDiscussionStatistics = (req, callback) => {
  const request = new GetDiscussionStatisticsRequest();
  request.setId(req.id);
  return rpcClient.getDiscussionStatistics(
    request,
    { ...authCreds() },
    (err, res) =>
      callback(
        err,
        res ? GetDiscussionStatisticsResponse.toObject(res, res) : undefined
      )
  );
};

client.addDiscussion = (req, callback) => {
  const request = new AddDiscussionRequest();
  const discussionInfo = new DiscussionInfo();
  const discussionOptions = new DiscussionOptions();

  discussionOptions.setFeeLimitMsat(req.discussion?.options?.feeLimitMsat);
  discussionOptions.setAnonymous(req.discussion?.options?.anonymous);
  discussionInfo.setOptions(discussionOptions);
  discussionInfo.setId(req.discussion.id);
  discussionInfo.setParticipantsList(req.discussion.participants);
  discussionInfo.setLastReadMsgId(req.discussion.lastReadMsgId);
  discussionInfo.setLastMsgId(req.discussion.lastMsgId);
  request.setDiscussion(discussionInfo);
  return rpcClient.addDiscussion(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? AddDiscussionResponse.toObject(res, res) : undefined)
  );
};

client.updateDiscussionLastRead = (req, callback) => {
  const request = new UpdateDiscussionLastReadRequest();
  request.setDiscussionId(req.discussionId);
  request.setLastReadMsgId(req.lastReadMsgId);
  return rpcClient.updateDiscussionLastRead(
    request,
    { ...authCreds() },
    (err, res) =>
      callback(
        err,
        res ? UpdateDiscussionResponse.toObject(res, res) : undefined
      )
  );
};

client.removeDiscussion = (req, callback) => {
  const request = new RemoveDiscussionRequest();
  request.setId(req.id);
  return rpcClient.removeDiscussion(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? RemoveDiscussionResponse.toObject(res, res) : undefined)
  );
};

const discussionClient = () => {
  return client;
};

export default discussionClient;
