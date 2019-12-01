const express = require("express");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(fileUpload());
app.use(express.json({ extended: false }));

// app.use(
//   multer({
//     dest: "/client/public/uploads/",
//     rename: function(fieldname, filename) {
//       return filename;
//     }
//   }).any()
// );

app.use("/api/upload", require("./routes/upload"));
// Upload Endpoint
app.post("/upload", (req, res) => {
  console.log("server upload called");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log("Server Started..."));
