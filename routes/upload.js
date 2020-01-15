const express = require("express");
const fs = require("fs");
const crypto2 = require("crypto");
//const bodyParser = require("body-parser");

//const app = express();
const router = express.Router();

//router.use(bodyParser.raw({ type: "application/octet-stream", limit: "2mb" }));
const DataFile = require("../models/DataFile");

const getAlgorithm = keyBase64 => {
  var key = Buffer.from(keyBase64, "base64");
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
  }

  throw new Error("Invalid key length: " + key.length);
};

const encryptFile = (data, keyBase64, ivBase64) => {
  const initVect = Buffer.from(ivBase64, "base64"); //crypto2.randomBytes(16);
  const CIPHER_KEY = Buffer.from(keyBase64, "base64");

  var aes = crypto2.createCipheriv(
    getAlgorithm(keyBase64),
    CIPHER_KEY,
    initVect
  );
  var encrypted = Buffer.concat([aes.update(data), aes.final()]);
  return encrypted;
};

const decryptFile = (data, keyBase64, ivBase64) => {
  const initVect = Buffer.from(ivBase64, "base64"); //crypto2.randomBytes(16);
  const CIPHER_KEY = Buffer.from(keyBase64, "base64");

  var aes = crypto2.createDecipheriv(
    getAlgorithm(keyBase64),
    CIPHER_KEY,
    initVect
  );
  var decrypted = Buffer.concat([aes.update(data), aes.final()]);
  return decrypted;
};

router.post("/", async (req, res) => {
  const { filename, file, cipher_key, init_vector } = req.body;
  const { data } = req.files.file;
  const encrypted_data = encryptFile(data, cipher_key, init_vector);
  // const decrypted_data = decryptFile(encrypted_data, cipher_key, init_vector);
  // console.log("data", data.toString());
  // console.log("data buffer", data.toString("hex"));
  // console.log("encrypted data buffer", encrypted_data.toString());
  // console.log("decrypted data buffer", decrypted_data.toString());
  try {
    var df = new DataFile();
    df.filename = "test";
    df.file = encrypted_data;
    // let datafile = new DataFile({
    //   filename,
    //   data
    // });

    await df.save((err, room) => {
      res.send(room._id);
      console.log("doc id", room._id);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
