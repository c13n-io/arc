import apiUrl from "../config/api-url";
import authCreds from "../config/auth-creds";

const {
  GetContactsRequest,
  GetContactsResponse,
  AddContactRequest,
  AddContactResponse,
  RemoveContactByIDRequest,
  RemoveContactResponse,
  RemoveContactByAddressRequest,
  ContactInfo,
  NodeInfo,
} = require("../rpc/rpc_pb");
const { ContactServiceClient } = require("../rpc/rpc_grpc_web_pb.js");

const rpcClient = new ContactServiceClient(apiUrl(), {});

const client = new Object();

client.getContacts = (req, callback) => {
  const request = new GetContactsRequest();
  return rpcClient.getContacts(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? GetContactsResponse.toObject(res, res) : undefined)
  );
};

client.addContact = (req, callback) => {
  const request = new AddContactRequest();
  const contact = new ContactInfo();
  const node = new NodeInfo();
  node.setAlias(req.contact.node.alias);
  node.setAddress(req.contact.node.address);
  contact.setNode(node);
  contact.setId(req.contact.id);
  contact.setDisplayName(req.contact.displayName);
  request.setContact(contact);
  return rpcClient.addContact(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? AddContactResponse.toObject(res, res) : undefined)
  );
};

client.removeContactByID = (req, callback) => {
  const request = new RemoveContactByIDRequest();
  request.setId(req.id);
  return rpcClient.removeContactByID(request, { ...authCreds() }, (err, res) =>
    callback(err, res ? RemoveContactResponse.toObject(res, res) : undefined)
  );
};

client.removeContactByAddress = (req, callback) => {
  const request = new RemoveContactByAddressRequest();
  request.setAddress(req.address);
  return rpcClient.removeContactByAddress(
    request,
    { ...authCreds() },
    (err, res) =>
      callback(err, res ? RemoveContactResponse.toObject(res, res) : undefined)
  );
};

const contactClient = () => {
  return client;
};

export default contactClient;
