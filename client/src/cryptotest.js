const crypto2 = require("crypto");
var fs = require("fs");

module.exports = {
  getAlgorithm: function(keyBase64) {
    var key = Buffer.from(keyBase64, "base64");
    switch (key.length) {
      case 16:
        return "aes-128-cbc";
      case 32:
        return "aes-256-cbc";
    }

    throw new Error("Invalid key length: " + key.length);
  },

  decryptFile: function(fileName, keyBase64, ivBase64) {
    const input = fs.createReadStream(fileName + ".encrypted");
    const output = fs.createWriteStream(fileName + ".unencrypted");

    const initVect = Buffer.from(ivBase64, "base64"); //crypto2.randomBytes(16);
    const CIPHER_KEY = Buffer.from(keyBase64, "base64");
    const decipher = crypto2.createDecipheriv(
      this.getAlgorithm(keyBase64),
      CIPHER_KEY,
      initVect
    );

    input
      .pipe(decipher)
      .pipe(output)
      .on("finish", () => {
        console.log("FILE DECRYPTED");
      })
      .on("error", error => {
        console.log(error);
      });
  },

  encryptFile: function(fileName, keyBase64, ivBase64) {
    const initVect = Buffer.from(ivBase64, "base64"); //crypto2.randomBytes(16);
    const CIPHER_KEY = Buffer.from(keyBase64, "base64");

    var aes = crypto2.createCipheriv(
      this.getAlgorithm(keyBase64),
      CIPHER_KEY,
      initVect
    );

    const input = fs.createReadStream(fileName);
    const output = fs.createWriteStream(fileName + ".encrypted");

    input
      .pipe(aes)
      .pipe(output)
      .on("finish", function() {
        console.log("done encrypting");
      });
  }
};

//const filename = "Decentralized File Exchange System.pdf";
//encryptFile(filename);
//decryptFile(filename);
