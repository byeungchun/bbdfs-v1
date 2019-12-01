const express = require("express");
const fs = require("fs");
//const bodyParser = require("body-parser");

//const app = express();
const router = express.Router();

//router.use(bodyParser.raw({ type: "application/octet-stream", limit: "2mb" }));
const DataFile = require("../models/DataFile");

router.post("/", async (req, res) => {
  //console.log("filedata", req.files.file);
  //filedata = fs.readFileSync(req.files.file.data);

  const { filename, file } = req.body;
  const { data } = req.files.file;
  //console.log("data buffer", data);
  try {
    var df = new DataFile();
    df.filename = "test2";
    df.file = data;
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
