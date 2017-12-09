'use strict';

const config = require("../../config/environment/development.js");
var cloudinary = require('cloudinary').v2;
export function signFileUploadRequest(request, response) {

  // get the api_secret (and keep it secret)
  var apiSecret = config.Cloudinary.api_secret;
  // grab a current timestamp
  var millisecondsToSeconds = 1000;
  var timestamp = Math.round(Date.now() / millisecondsToSeconds);
  console.log(timestamp);
  // generate the signature using the current timestmap and any other desired Cloudinary params
  var signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, apiSecret);
  console.log(signature);
  // craft a signature payload to send to the client (timestamp and signature required, api_key either sent here or stored on client)
  var payload = {
  signature: signature,
  timestamp: timestamp
  };
  console.log(payload);
  // send it back to the client
  response.json(payload);
  }
