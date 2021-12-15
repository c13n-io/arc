const createAttachment = (type, uri, tags, show) => {
  return {
    t: type,
    u: uri,
    tags: tags ? tags : '',
    show: show ? show : false
  };
};

export {
  createAttachment
};