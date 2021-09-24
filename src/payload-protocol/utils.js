const createAttachment = (type, uri, tags, show) => {
  return {
    type: type,
    uri: uri,
    tags: tags ? tags : '',
    show: show ? show : false
  };
};

export {
  createAttachment
};