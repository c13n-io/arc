/**
 * @fileoverview gRPC-Web generated client stub for services
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var validator_pb = require('./validator_pb.js')
const proto = {};
proto.services = require('./rpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.NodeInfoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.NodeInfoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.VersionRequest,
 *   !proto.services.Version>}
 */
const methodDescriptor_NodeInfoService_GetVersion = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/GetVersion',
  grpc.web.MethodType.UNARY,
  proto.services.VersionRequest,
  proto.services.Version,
  /**
   * @param {!proto.services.VersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.Version.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.VersionRequest,
 *   !proto.services.Version>}
 */
const methodInfo_NodeInfoService_GetVersion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.Version,
  /**
   * @param {!proto.services.VersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.Version.deserializeBinary
);


/**
 * @param {!proto.services.VersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.Version)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.Version>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.getVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/GetVersion',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetVersion,
      callback);
};


/**
 * @param {!proto.services.VersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.Version>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.getVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/GetVersion',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SelfInfoRequest,
 *   !proto.services.SelfInfoResponse>}
 */
const methodDescriptor_NodeInfoService_GetSelfInfo = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/GetSelfInfo',
  grpc.web.MethodType.UNARY,
  proto.services.SelfInfoRequest,
  proto.services.SelfInfoResponse,
  /**
   * @param {!proto.services.SelfInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SelfInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SelfInfoRequest,
 *   !proto.services.SelfInfoResponse>}
 */
const methodInfo_NodeInfoService_GetSelfInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SelfInfoResponse,
  /**
   * @param {!proto.services.SelfInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SelfInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.SelfInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SelfInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SelfInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.getSelfInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/GetSelfInfo',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetSelfInfo,
      callback);
};


/**
 * @param {!proto.services.SelfInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SelfInfoResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.getSelfInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/GetSelfInfo',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetSelfInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SelfBalanceRequest,
 *   !proto.services.SelfBalanceResponse>}
 */
const methodDescriptor_NodeInfoService_GetSelfBalance = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/GetSelfBalance',
  grpc.web.MethodType.UNARY,
  proto.services.SelfBalanceRequest,
  proto.services.SelfBalanceResponse,
  /**
   * @param {!proto.services.SelfBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SelfBalanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SelfBalanceRequest,
 *   !proto.services.SelfBalanceResponse>}
 */
const methodInfo_NodeInfoService_GetSelfBalance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SelfBalanceResponse,
  /**
   * @param {!proto.services.SelfBalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SelfBalanceResponse.deserializeBinary
);


/**
 * @param {!proto.services.SelfBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SelfBalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SelfBalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.getSelfBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/GetSelfBalance',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetSelfBalance,
      callback);
};


/**
 * @param {!proto.services.SelfBalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SelfBalanceResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.getSelfBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/GetSelfBalance',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetSelfBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetNodesRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodDescriptor_NodeInfoService_GetNodes = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/GetNodes',
  grpc.web.MethodType.UNARY,
  proto.services.GetNodesRequest,
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.GetNodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetNodesRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodInfo_NodeInfoService_GetNodes = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.GetNodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetNodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.NodeInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.NodeInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.getNodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/GetNodes',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetNodes,
      callback);
};


/**
 * @param {!proto.services.GetNodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.NodeInfoResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.getNodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/GetNodes',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_GetNodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SearchNodeByAddressRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodDescriptor_NodeInfoService_SearchNodeByAddress = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/SearchNodeByAddress',
  grpc.web.MethodType.UNARY,
  proto.services.SearchNodeByAddressRequest,
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.SearchNodeByAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SearchNodeByAddressRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodInfo_NodeInfoService_SearchNodeByAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.SearchNodeByAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.SearchNodeByAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.NodeInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.NodeInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.searchNodeByAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/SearchNodeByAddress',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_SearchNodeByAddress,
      callback);
};


/**
 * @param {!proto.services.SearchNodeByAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.NodeInfoResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.searchNodeByAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/SearchNodeByAddress',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_SearchNodeByAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SearchNodeByAliasRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodDescriptor_NodeInfoService_SearchNodeByAlias = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/SearchNodeByAlias',
  grpc.web.MethodType.UNARY,
  proto.services.SearchNodeByAliasRequest,
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.SearchNodeByAliasRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SearchNodeByAliasRequest,
 *   !proto.services.NodeInfoResponse>}
 */
const methodInfo_NodeInfoService_SearchNodeByAlias = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.NodeInfoResponse,
  /**
   * @param {!proto.services.SearchNodeByAliasRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.NodeInfoResponse.deserializeBinary
);


/**
 * @param {!proto.services.SearchNodeByAliasRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.NodeInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.NodeInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.searchNodeByAlias =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/SearchNodeByAlias',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_SearchNodeByAlias,
      callback);
};


/**
 * @param {!proto.services.SearchNodeByAliasRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.NodeInfoResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.searchNodeByAlias =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/SearchNodeByAlias',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_SearchNodeByAlias);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ConnectNodeRequest,
 *   !proto.services.ConnectNodeResponse>}
 */
const methodDescriptor_NodeInfoService_ConnectNode = new grpc.web.MethodDescriptor(
  '/services.NodeInfoService/ConnectNode',
  grpc.web.MethodType.UNARY,
  proto.services.ConnectNodeRequest,
  proto.services.ConnectNodeResponse,
  /**
   * @param {!proto.services.ConnectNodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ConnectNodeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.ConnectNodeRequest,
 *   !proto.services.ConnectNodeResponse>}
 */
const methodInfo_NodeInfoService_ConnectNode = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.ConnectNodeResponse,
  /**
   * @param {!proto.services.ConnectNodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ConnectNodeResponse.deserializeBinary
);


/**
 * @param {!proto.services.ConnectNodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.ConnectNodeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ConnectNodeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.NodeInfoServiceClient.prototype.connectNode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.NodeInfoService/ConnectNode',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_ConnectNode,
      callback);
};


/**
 * @param {!proto.services.ConnectNodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ConnectNodeResponse>}
 *     Promise that resolves to the response
 */
proto.services.NodeInfoServicePromiseClient.prototype.connectNode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.NodeInfoService/ConnectNode',
      request,
      metadata || {},
      methodDescriptor_NodeInfoService_ConnectNode);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ChannelServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ChannelServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.OpenChannelRequest,
 *   !proto.services.OpenChannelResponse>}
 */
const methodDescriptor_ChannelService_OpenChannel = new grpc.web.MethodDescriptor(
  '/services.ChannelService/OpenChannel',
  grpc.web.MethodType.UNARY,
  proto.services.OpenChannelRequest,
  proto.services.OpenChannelResponse,
  /**
   * @param {!proto.services.OpenChannelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.OpenChannelResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.OpenChannelRequest,
 *   !proto.services.OpenChannelResponse>}
 */
const methodInfo_ChannelService_OpenChannel = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.OpenChannelResponse,
  /**
   * @param {!proto.services.OpenChannelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.OpenChannelResponse.deserializeBinary
);


/**
 * @param {!proto.services.OpenChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.OpenChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.OpenChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ChannelServiceClient.prototype.openChannel =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ChannelService/OpenChannel',
      request,
      metadata || {},
      methodDescriptor_ChannelService_OpenChannel,
      callback);
};


/**
 * @param {!proto.services.OpenChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.OpenChannelResponse>}
 *     Promise that resolves to the response
 */
proto.services.ChannelServicePromiseClient.prototype.openChannel =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ChannelService/OpenChannel',
      request,
      metadata || {},
      methodDescriptor_ChannelService_OpenChannel);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ContactServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ContactServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetContactsRequest,
 *   !proto.services.GetContactsResponse>}
 */
const methodDescriptor_ContactService_GetContacts = new grpc.web.MethodDescriptor(
  '/services.ContactService/GetContacts',
  grpc.web.MethodType.UNARY,
  proto.services.GetContactsRequest,
  proto.services.GetContactsResponse,
  /**
   * @param {!proto.services.GetContactsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetContactsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetContactsRequest,
 *   !proto.services.GetContactsResponse>}
 */
const methodInfo_ContactService_GetContacts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetContactsResponse,
  /**
   * @param {!proto.services.GetContactsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetContactsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetContactsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetContactsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetContactsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ContactServiceClient.prototype.getContacts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ContactService/GetContacts',
      request,
      metadata || {},
      methodDescriptor_ContactService_GetContacts,
      callback);
};


/**
 * @param {!proto.services.GetContactsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetContactsResponse>}
 *     Promise that resolves to the response
 */
proto.services.ContactServicePromiseClient.prototype.getContacts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ContactService/GetContacts',
      request,
      metadata || {},
      methodDescriptor_ContactService_GetContacts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddContactRequest,
 *   !proto.services.AddContactResponse>}
 */
const methodDescriptor_ContactService_AddContact = new grpc.web.MethodDescriptor(
  '/services.ContactService/AddContact',
  grpc.web.MethodType.UNARY,
  proto.services.AddContactRequest,
  proto.services.AddContactResponse,
  /**
   * @param {!proto.services.AddContactRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddContactResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AddContactRequest,
 *   !proto.services.AddContactResponse>}
 */
const methodInfo_ContactService_AddContact = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AddContactResponse,
  /**
   * @param {!proto.services.AddContactRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddContactResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddContactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AddContactResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddContactResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ContactServiceClient.prototype.addContact =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ContactService/AddContact',
      request,
      metadata || {},
      methodDescriptor_ContactService_AddContact,
      callback);
};


/**
 * @param {!proto.services.AddContactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddContactResponse>}
 *     Promise that resolves to the response
 */
proto.services.ContactServicePromiseClient.prototype.addContact =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ContactService/AddContact',
      request,
      metadata || {},
      methodDescriptor_ContactService_AddContact);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RemoveContactByIDRequest,
 *   !proto.services.RemoveContactResponse>}
 */
const methodDescriptor_ContactService_RemoveContactByID = new grpc.web.MethodDescriptor(
  '/services.ContactService/RemoveContactByID',
  grpc.web.MethodType.UNARY,
  proto.services.RemoveContactByIDRequest,
  proto.services.RemoveContactResponse,
  /**
   * @param {!proto.services.RemoveContactByIDRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveContactResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.RemoveContactByIDRequest,
 *   !proto.services.RemoveContactResponse>}
 */
const methodInfo_ContactService_RemoveContactByID = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.RemoveContactResponse,
  /**
   * @param {!proto.services.RemoveContactByIDRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveContactResponse.deserializeBinary
);


/**
 * @param {!proto.services.RemoveContactByIDRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.RemoveContactResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RemoveContactResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ContactServiceClient.prototype.removeContactByID =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ContactService/RemoveContactByID',
      request,
      metadata || {},
      methodDescriptor_ContactService_RemoveContactByID,
      callback);
};


/**
 * @param {!proto.services.RemoveContactByIDRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RemoveContactResponse>}
 *     Promise that resolves to the response
 */
proto.services.ContactServicePromiseClient.prototype.removeContactByID =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ContactService/RemoveContactByID',
      request,
      metadata || {},
      methodDescriptor_ContactService_RemoveContactByID);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RemoveContactByAddressRequest,
 *   !proto.services.RemoveContactResponse>}
 */
const methodDescriptor_ContactService_RemoveContactByAddress = new grpc.web.MethodDescriptor(
  '/services.ContactService/RemoveContactByAddress',
  grpc.web.MethodType.UNARY,
  proto.services.RemoveContactByAddressRequest,
  proto.services.RemoveContactResponse,
  /**
   * @param {!proto.services.RemoveContactByAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveContactResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.RemoveContactByAddressRequest,
 *   !proto.services.RemoveContactResponse>}
 */
const methodInfo_ContactService_RemoveContactByAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.RemoveContactResponse,
  /**
   * @param {!proto.services.RemoveContactByAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveContactResponse.deserializeBinary
);


/**
 * @param {!proto.services.RemoveContactByAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.RemoveContactResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RemoveContactResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ContactServiceClient.prototype.removeContactByAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ContactService/RemoveContactByAddress',
      request,
      metadata || {},
      methodDescriptor_ContactService_RemoveContactByAddress,
      callback);
};


/**
 * @param {!proto.services.RemoveContactByAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RemoveContactResponse>}
 *     Promise that resolves to the response
 */
proto.services.ContactServicePromiseClient.prototype.removeContactByAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ContactService/RemoveContactByAddress',
      request,
      metadata || {},
      methodDescriptor_ContactService_RemoveContactByAddress);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.MessageServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.MessageServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.EstimateMessageRequest,
 *   !proto.services.EstimateMessageResponse>}
 */
const methodDescriptor_MessageService_EstimateMessage = new grpc.web.MethodDescriptor(
  '/services.MessageService/EstimateMessage',
  grpc.web.MethodType.UNARY,
  proto.services.EstimateMessageRequest,
  proto.services.EstimateMessageResponse,
  /**
   * @param {!proto.services.EstimateMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.EstimateMessageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.EstimateMessageRequest,
 *   !proto.services.EstimateMessageResponse>}
 */
const methodInfo_MessageService_EstimateMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.EstimateMessageResponse,
  /**
   * @param {!proto.services.EstimateMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.EstimateMessageResponse.deserializeBinary
);


/**
 * @param {!proto.services.EstimateMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.EstimateMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.EstimateMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.MessageServiceClient.prototype.estimateMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.MessageService/EstimateMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_EstimateMessage,
      callback);
};


/**
 * @param {!proto.services.EstimateMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.EstimateMessageResponse>}
 *     Promise that resolves to the response
 */
proto.services.MessageServicePromiseClient.prototype.estimateMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.MessageService/EstimateMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_EstimateMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SendMessageRequest,
 *   !proto.services.SendMessageResponse>}
 */
const methodDescriptor_MessageService_SendMessage = new grpc.web.MethodDescriptor(
  '/services.MessageService/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.services.SendMessageRequest,
  proto.services.SendMessageResponse,
  /**
   * @param {!proto.services.SendMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SendMessageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SendMessageRequest,
 *   !proto.services.SendMessageResponse>}
 */
const methodInfo_MessageService_SendMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SendMessageResponse,
  /**
   * @param {!proto.services.SendMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SendMessageResponse.deserializeBinary
);


/**
 * @param {!proto.services.SendMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.SendMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.SendMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.MessageServiceClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.MessageService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_SendMessage,
      callback);
};


/**
 * @param {!proto.services.SendMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.SendMessageResponse>}
 *     Promise that resolves to the response
 */
proto.services.MessageServicePromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.MessageService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_MessageService_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.SubscribeMessageRequest,
 *   !proto.services.SubscribeMessageResponse>}
 */
const methodDescriptor_MessageService_SubscribeMessages = new grpc.web.MethodDescriptor(
  '/services.MessageService/SubscribeMessages',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.services.SubscribeMessageRequest,
  proto.services.SubscribeMessageResponse,
  /**
   * @param {!proto.services.SubscribeMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SubscribeMessageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.SubscribeMessageRequest,
 *   !proto.services.SubscribeMessageResponse>}
 */
const methodInfo_MessageService_SubscribeMessages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.SubscribeMessageResponse,
  /**
   * @param {!proto.services.SubscribeMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.SubscribeMessageResponse.deserializeBinary
);


/**
 * @param {!proto.services.SubscribeMessageRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.SubscribeMessageResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.MessageServiceClient.prototype.subscribeMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.MessageService/SubscribeMessages',
      request,
      metadata || {},
      methodDescriptor_MessageService_SubscribeMessages);
};


/**
 * @param {!proto.services.SubscribeMessageRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.SubscribeMessageResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.MessageServicePromiseClient.prototype.subscribeMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.MessageService/SubscribeMessages',
      request,
      metadata || {},
      methodDescriptor_MessageService_SubscribeMessages);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.DiscussionServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.DiscussionServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetDiscussionsRequest,
 *   !proto.services.GetDiscussionsResponse>}
 */
const methodDescriptor_DiscussionService_GetDiscussions = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/GetDiscussions',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.services.GetDiscussionsRequest,
  proto.services.GetDiscussionsResponse,
  /**
   * @param {!proto.services.GetDiscussionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetDiscussionsRequest,
 *   !proto.services.GetDiscussionsResponse>}
 */
const methodInfo_DiscussionService_GetDiscussions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetDiscussionsResponse,
  /**
   * @param {!proto.services.GetDiscussionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetDiscussionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetDiscussionsResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.getDiscussions =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.DiscussionService/GetDiscussions',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussions);
};


/**
 * @param {!proto.services.GetDiscussionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetDiscussionsResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServicePromiseClient.prototype.getDiscussions =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.DiscussionService/GetDiscussions',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetDiscussionHistoryByIDRequest,
 *   !proto.services.GetDiscussionHistoryResponse>}
 */
const methodDescriptor_DiscussionService_GetDiscussionHistoryByID = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/GetDiscussionHistoryByID',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.services.GetDiscussionHistoryByIDRequest,
  proto.services.GetDiscussionHistoryResponse,
  /**
   * @param {!proto.services.GetDiscussionHistoryByIDRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionHistoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetDiscussionHistoryByIDRequest,
 *   !proto.services.GetDiscussionHistoryResponse>}
 */
const methodInfo_DiscussionService_GetDiscussionHistoryByID = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetDiscussionHistoryResponse,
  /**
   * @param {!proto.services.GetDiscussionHistoryByIDRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetDiscussionHistoryByIDRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetDiscussionHistoryResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.getDiscussionHistoryByID =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.DiscussionService/GetDiscussionHistoryByID',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussionHistoryByID);
};


/**
 * @param {!proto.services.GetDiscussionHistoryByIDRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetDiscussionHistoryResponse>}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServicePromiseClient.prototype.getDiscussionHistoryByID =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/services.DiscussionService/GetDiscussionHistoryByID',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussionHistoryByID);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetDiscussionStatisticsRequest,
 *   !proto.services.GetDiscussionStatisticsResponse>}
 */
const methodDescriptor_DiscussionService_GetDiscussionStatistics = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/GetDiscussionStatistics',
  grpc.web.MethodType.UNARY,
  proto.services.GetDiscussionStatisticsRequest,
  proto.services.GetDiscussionStatisticsResponse,
  /**
   * @param {!proto.services.GetDiscussionStatisticsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionStatisticsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.GetDiscussionStatisticsRequest,
 *   !proto.services.GetDiscussionStatisticsResponse>}
 */
const methodInfo_DiscussionService_GetDiscussionStatistics = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.GetDiscussionStatisticsResponse,
  /**
   * @param {!proto.services.GetDiscussionStatisticsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetDiscussionStatisticsResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetDiscussionStatisticsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.GetDiscussionStatisticsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetDiscussionStatisticsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.getDiscussionStatistics =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.DiscussionService/GetDiscussionStatistics',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussionStatistics,
      callback);
};


/**
 * @param {!proto.services.GetDiscussionStatisticsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetDiscussionStatisticsResponse>}
 *     Promise that resolves to the response
 */
proto.services.DiscussionServicePromiseClient.prototype.getDiscussionStatistics =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.DiscussionService/GetDiscussionStatistics',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_GetDiscussionStatistics);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddDiscussionRequest,
 *   !proto.services.AddDiscussionResponse>}
 */
const methodDescriptor_DiscussionService_AddDiscussion = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/AddDiscussion',
  grpc.web.MethodType.UNARY,
  proto.services.AddDiscussionRequest,
  proto.services.AddDiscussionResponse,
  /**
   * @param {!proto.services.AddDiscussionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddDiscussionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.AddDiscussionRequest,
 *   !proto.services.AddDiscussionResponse>}
 */
const methodInfo_DiscussionService_AddDiscussion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.AddDiscussionResponse,
  /**
   * @param {!proto.services.AddDiscussionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddDiscussionResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddDiscussionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.AddDiscussionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddDiscussionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.addDiscussion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.DiscussionService/AddDiscussion',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_AddDiscussion,
      callback);
};


/**
 * @param {!proto.services.AddDiscussionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddDiscussionResponse>}
 *     Promise that resolves to the response
 */
proto.services.DiscussionServicePromiseClient.prototype.addDiscussion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.DiscussionService/AddDiscussion',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_AddDiscussion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateDiscussionLastReadRequest,
 *   !proto.services.UpdateDiscussionResponse>}
 */
const methodDescriptor_DiscussionService_UpdateDiscussionLastRead = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/UpdateDiscussionLastRead',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateDiscussionLastReadRequest,
  proto.services.UpdateDiscussionResponse,
  /**
   * @param {!proto.services.UpdateDiscussionLastReadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateDiscussionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.UpdateDiscussionLastReadRequest,
 *   !proto.services.UpdateDiscussionResponse>}
 */
const methodInfo_DiscussionService_UpdateDiscussionLastRead = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.UpdateDiscussionResponse,
  /**
   * @param {!proto.services.UpdateDiscussionLastReadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateDiscussionResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateDiscussionLastReadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.UpdateDiscussionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UpdateDiscussionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.updateDiscussionLastRead =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.DiscussionService/UpdateDiscussionLastRead',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_UpdateDiscussionLastRead,
      callback);
};


/**
 * @param {!proto.services.UpdateDiscussionLastReadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UpdateDiscussionResponse>}
 *     Promise that resolves to the response
 */
proto.services.DiscussionServicePromiseClient.prototype.updateDiscussionLastRead =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.DiscussionService/UpdateDiscussionLastRead',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_UpdateDiscussionLastRead);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RemoveDiscussionRequest,
 *   !proto.services.RemoveDiscussionResponse>}
 */
const methodDescriptor_DiscussionService_RemoveDiscussion = new grpc.web.MethodDescriptor(
  '/services.DiscussionService/RemoveDiscussion',
  grpc.web.MethodType.UNARY,
  proto.services.RemoveDiscussionRequest,
  proto.services.RemoveDiscussionResponse,
  /**
   * @param {!proto.services.RemoveDiscussionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveDiscussionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.RemoveDiscussionRequest,
 *   !proto.services.RemoveDiscussionResponse>}
 */
const methodInfo_DiscussionService_RemoveDiscussion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.RemoveDiscussionResponse,
  /**
   * @param {!proto.services.RemoveDiscussionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveDiscussionResponse.deserializeBinary
);


/**
 * @param {!proto.services.RemoveDiscussionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.RemoveDiscussionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RemoveDiscussionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.DiscussionServiceClient.prototype.removeDiscussion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.DiscussionService/RemoveDiscussion',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_RemoveDiscussion,
      callback);
};


/**
 * @param {!proto.services.RemoveDiscussionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RemoveDiscussionResponse>}
 *     Promise that resolves to the response
 */
proto.services.DiscussionServicePromiseClient.prototype.removeDiscussion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.DiscussionService/RemoveDiscussion',
      request,
      metadata || {},
      methodDescriptor_DiscussionService_RemoveDiscussion);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.PaymentServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.services.PaymentServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.CreateInvoiceRequest,
 *   !proto.services.CreateInvoiceResponse>}
 */
const methodDescriptor_PaymentService_CreateInvoice = new grpc.web.MethodDescriptor(
  '/services.PaymentService/CreateInvoice',
  grpc.web.MethodType.UNARY,
  proto.services.CreateInvoiceRequest,
  proto.services.CreateInvoiceResponse,
  /**
   * @param {!proto.services.CreateInvoiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateInvoiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.CreateInvoiceRequest,
 *   !proto.services.CreateInvoiceResponse>}
 */
const methodInfo_PaymentService_CreateInvoice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.CreateInvoiceResponse,
  /**
   * @param {!proto.services.CreateInvoiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.CreateInvoiceResponse.deserializeBinary
);


/**
 * @param {!proto.services.CreateInvoiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.CreateInvoiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.CreateInvoiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.PaymentServiceClient.prototype.createInvoice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.PaymentService/CreateInvoice',
      request,
      metadata || {},
      methodDescriptor_PaymentService_CreateInvoice,
      callback);
};


/**
 * @param {!proto.services.CreateInvoiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.CreateInvoiceResponse>}
 *     Promise that resolves to the response
 */
proto.services.PaymentServicePromiseClient.prototype.createInvoice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.PaymentService/CreateInvoice',
      request,
      metadata || {},
      methodDescriptor_PaymentService_CreateInvoice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.LookupInvoiceRequest,
 *   !proto.services.LookupInvoiceResponse>}
 */
const methodDescriptor_PaymentService_LookupInvoice = new grpc.web.MethodDescriptor(
  '/services.PaymentService/LookupInvoice',
  grpc.web.MethodType.UNARY,
  proto.services.LookupInvoiceRequest,
  proto.services.LookupInvoiceResponse,
  /**
   * @param {!proto.services.LookupInvoiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LookupInvoiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.services.LookupInvoiceRequest,
 *   !proto.services.LookupInvoiceResponse>}
 */
const methodInfo_PaymentService_LookupInvoice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.services.LookupInvoiceResponse,
  /**
   * @param {!proto.services.LookupInvoiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.LookupInvoiceResponse.deserializeBinary
);


/**
 * @param {!proto.services.LookupInvoiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.services.LookupInvoiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.LookupInvoiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.PaymentServiceClient.prototype.lookupInvoice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.PaymentService/LookupInvoice',
      request,
      metadata || {},
      methodDescriptor_PaymentService_LookupInvoice,
      callback);
};


/**
 * @param {!proto.services.LookupInvoiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.LookupInvoiceResponse>}
 *     Promise that resolves to the response
 */
proto.services.PaymentServicePromiseClient.prototype.lookupInvoice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.PaymentService/LookupInvoice',
      request,
      metadata || {},
      methodDescriptor_PaymentService_LookupInvoice);
};


module.exports = proto.services;

