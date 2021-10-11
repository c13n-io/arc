/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.exportSymbol('proto.validator.FieldValidator', null, global);
goog.exportSymbol('proto.validator.OneofValidator', null, global);
goog.exportSymbol('proto.validator.field', null, global);
goog.exportSymbol('proto.validator.oneof', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.validator.FieldValidator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.validator.FieldValidator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.validator.FieldValidator.displayName = 'proto.validator.FieldValidator';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
  proto.validator.FieldValidator.prototype.toObject = function(opt_includeInstance) {
    return proto.validator.FieldValidator.toObject(opt_includeInstance, this);
  };


  /**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.validator.FieldValidator} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
  proto.validator.FieldValidator.toObject = function(includeInstance, msg) {
    var f, obj = {
      regex: jspb.Message.getField(msg, 1),
      intGt: jspb.Message.getField(msg, 2),
      intLt: jspb.Message.getField(msg, 3),
      msgExists: jspb.Message.getField(msg, 4),
      humanError: jspb.Message.getField(msg, 5),
      floatGt: jspb.Message.getOptionalFloatingPointField(msg, 6),
      floatLt: jspb.Message.getOptionalFloatingPointField(msg, 7),
      floatEpsilon: jspb.Message.getOptionalFloatingPointField(msg, 8),
      floatGte: jspb.Message.getOptionalFloatingPointField(msg, 9),
      floatLte: jspb.Message.getOptionalFloatingPointField(msg, 10),
      stringNotEmpty: jspb.Message.getField(msg, 11),
      repeatedCountMin: jspb.Message.getField(msg, 12),
      repeatedCountMax: jspb.Message.getField(msg, 13),
      lengthGt: jspb.Message.getField(msg, 14),
      lengthLt: jspb.Message.getField(msg, 15),
      lengthEq: jspb.Message.getField(msg, 16),
      isInEnum: jspb.Message.getField(msg, 17),
      uuidVer: jspb.Message.getField(msg, 18)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.validator.FieldValidator}
 */
proto.validator.FieldValidator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.validator.FieldValidator;
  return proto.validator.FieldValidator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.validator.FieldValidator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.validator.FieldValidator}
 */
proto.validator.FieldValidator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRegex(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setIntGt(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setIntLt(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMsgExists(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setHumanError(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFloatGt(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFloatLt(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFloatEpsilon(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFloatGte(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFloatLte(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setStringNotEmpty(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setRepeatedCountMin(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setRepeatedCountMax(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLengthGt(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLengthLt(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLengthEq(value);
      break;
    case 17:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsInEnum(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setUuidVer(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.validator.FieldValidator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.validator.FieldValidator.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.validator.FieldValidator} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.validator.FieldValidator.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBool(
      4,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeString(
      5,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeDouble(
      8,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeDouble(
      9,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeDouble(
      10,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 11));
  if (f != null) {
    writer.writeBool(
      11,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 12));
  if (f != null) {
    writer.writeInt64(
      12,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 13));
  if (f != null) {
    writer.writeInt64(
      13,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 14));
  if (f != null) {
    writer.writeInt64(
      14,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 15));
  if (f != null) {
    writer.writeInt64(
      15,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 16));
  if (f != null) {
    writer.writeInt64(
      16,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 17));
  if (f != null) {
    writer.writeBool(
      17,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 18));
  if (f != null) {
    writer.writeInt32(
      18,
      f
    );
  }
};


/**
 * optional string regex = 1;
 * @return {string}
 */
proto.validator.FieldValidator.prototype.getRegex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.validator.FieldValidator.prototype.setRegex = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.validator.FieldValidator.prototype.clearRegex = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasRegex = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int64 int_gt = 2;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getIntGt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setIntGt = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.validator.FieldValidator.prototype.clearIntGt = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasIntGt = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int64 int_lt = 3;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getIntLt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setIntLt = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.validator.FieldValidator.prototype.clearIntLt = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasIntLt = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bool msg_exists = 4;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.validator.FieldValidator.prototype.getMsgExists = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 4, false));
};


/** @param {boolean} value */
proto.validator.FieldValidator.prototype.setMsgExists = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.validator.FieldValidator.prototype.clearMsgExists = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasMsgExists = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string human_error = 5;
 * @return {string}
 */
proto.validator.FieldValidator.prototype.getHumanError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.validator.FieldValidator.prototype.setHumanError = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.validator.FieldValidator.prototype.clearHumanError = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasHumanError = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional double float_gt = 6;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getFloatGt = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 6, 0.0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setFloatGt = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.validator.FieldValidator.prototype.clearFloatGt = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasFloatGt = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional double float_lt = 7;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getFloatLt = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 7, 0.0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setFloatLt = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.validator.FieldValidator.prototype.clearFloatLt = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasFloatLt = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional double float_epsilon = 8;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getFloatEpsilon = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 8, 0.0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setFloatEpsilon = function(value) {
  jspb.Message.setField(this, 8, value);
};


proto.validator.FieldValidator.prototype.clearFloatEpsilon = function() {
  jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasFloatEpsilon = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional double float_gte = 9;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getFloatGte = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 9, 0.0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setFloatGte = function(value) {
  jspb.Message.setField(this, 9, value);
};


proto.validator.FieldValidator.prototype.clearFloatGte = function() {
  jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasFloatGte = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional double float_lte = 10;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getFloatLte = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 10, 0.0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setFloatLte = function(value) {
  jspb.Message.setField(this, 10, value);
};


proto.validator.FieldValidator.prototype.clearFloatLte = function() {
  jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasFloatLte = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional bool string_not_empty = 11;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.validator.FieldValidator.prototype.getStringNotEmpty = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 11, false));
};


/** @param {boolean} value */
proto.validator.FieldValidator.prototype.setStringNotEmpty = function(value) {
  jspb.Message.setField(this, 11, value);
};


proto.validator.FieldValidator.prototype.clearStringNotEmpty = function() {
  jspb.Message.setField(this, 11, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasStringNotEmpty = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional int64 repeated_count_min = 12;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getRepeatedCountMin = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setRepeatedCountMin = function(value) {
  jspb.Message.setField(this, 12, value);
};


proto.validator.FieldValidator.prototype.clearRepeatedCountMin = function() {
  jspb.Message.setField(this, 12, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasRepeatedCountMin = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional int64 repeated_count_max = 13;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getRepeatedCountMax = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setRepeatedCountMax = function(value) {
  jspb.Message.setField(this, 13, value);
};


proto.validator.FieldValidator.prototype.clearRepeatedCountMax = function() {
  jspb.Message.setField(this, 13, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasRepeatedCountMax = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional int64 length_gt = 14;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getLengthGt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setLengthGt = function(value) {
  jspb.Message.setField(this, 14, value);
};


proto.validator.FieldValidator.prototype.clearLengthGt = function() {
  jspb.Message.setField(this, 14, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasLengthGt = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional int64 length_lt = 15;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getLengthLt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setLengthLt = function(value) {
  jspb.Message.setField(this, 15, value);
};


proto.validator.FieldValidator.prototype.clearLengthLt = function() {
  jspb.Message.setField(this, 15, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasLengthLt = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional int64 length_eq = 16;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getLengthEq = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setLengthEq = function(value) {
  jspb.Message.setField(this, 16, value);
};


proto.validator.FieldValidator.prototype.clearLengthEq = function() {
  jspb.Message.setField(this, 16, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasLengthEq = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional bool is_in_enum = 17;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.validator.FieldValidator.prototype.getIsInEnum = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 17, false));
};


/** @param {boolean} value */
proto.validator.FieldValidator.prototype.setIsInEnum = function(value) {
  jspb.Message.setField(this, 17, value);
};


proto.validator.FieldValidator.prototype.clearIsInEnum = function() {
  jspb.Message.setField(this, 17, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasIsInEnum = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional int32 uuid_ver = 18;
 * @return {number}
 */
proto.validator.FieldValidator.prototype.getUuidVer = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/** @param {number} value */
proto.validator.FieldValidator.prototype.setUuidVer = function(value) {
  jspb.Message.setField(this, 18, value);
};


proto.validator.FieldValidator.prototype.clearUuidVer = function() {
  jspb.Message.setField(this, 18, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.FieldValidator.prototype.hasUuidVer = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.validator.OneofValidator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.validator.OneofValidator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.validator.OneofValidator.displayName = 'proto.validator.OneofValidator';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
  proto.validator.OneofValidator.prototype.toObject = function(opt_includeInstance) {
    return proto.validator.OneofValidator.toObject(opt_includeInstance, this);
  };


  /**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.validator.OneofValidator} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
  proto.validator.OneofValidator.toObject = function(includeInstance, msg) {
    var f, obj = {
      required: jspb.Message.getField(msg, 1)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.validator.OneofValidator}
 */
proto.validator.OneofValidator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.validator.OneofValidator;
  return proto.validator.OneofValidator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.validator.OneofValidator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.validator.OneofValidator}
 */
proto.validator.OneofValidator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRequired(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.validator.OneofValidator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.validator.OneofValidator.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.validator.OneofValidator} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.validator.OneofValidator.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool required = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.validator.OneofValidator.prototype.getRequired = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.validator.OneofValidator.prototype.setRequired = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.validator.OneofValidator.prototype.clearRequired = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.validator.OneofValidator.prototype.hasRequired = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `field`.
 * @type {!jspb.ExtensionFieldInfo<!proto.validator.FieldValidator>}
 */
proto.validator.field = new jspb.ExtensionFieldInfo(
  65020,
  {field: 0},
  proto.validator.FieldValidator,
  /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
    proto.validator.FieldValidator.toObject),
  0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[65020] = new jspb.ExtensionFieldBinaryInfo(
  proto.validator.field,
  jspb.BinaryReader.prototype.readMessage,
  jspb.BinaryWriter.prototype.writeMessage,
  proto.validator.FieldValidator.serializeBinaryToWriter,
  proto.validator.FieldValidator.deserializeBinaryFromReader,
  false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[65020] = proto.validator.field;


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `oneof`.
 * @type {!jspb.ExtensionFieldInfo<!proto.validator.OneofValidator>}
 */
proto.validator.oneof = new jspb.ExtensionFieldInfo(
  65021,
  {oneof: 0},
  proto.validator.OneofValidator,
  /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
    proto.validator.OneofValidator.toObject),
  0);

google_protobuf_descriptor_pb.OneofOptions.extensionsBinary[65021] = new jspb.ExtensionFieldBinaryInfo(
  proto.validator.oneof,
  jspb.BinaryReader.prototype.readMessage,
  jspb.BinaryWriter.prototype.writeMessage,
  proto.validator.OneofValidator.serializeBinaryToWriter,
  proto.validator.OneofValidator.deserializeBinaryFromReader,
  false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.OneofOptions.extensions[65021] = proto.validator.oneof;

goog.object.extend(exports, proto.validator);
