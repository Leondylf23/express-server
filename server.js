const express = require("express");
const cors = require("cors");
const multer = require("multer");
const url = require("url");
require("dotenv").config();

const app = express();
const serverPort = process.env.SERVER_PORT ?? 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./Files`);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

app.put('/upload-file', upload.single("file"), (req, res) => {
  try {
    res.json({ message: "uploaded" });
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

app.put('/upload-multi-file', upload.array("files"), (req, res) => {
  try {
    res.json({ message: "uploaded" });
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

app.get("/get-data/:filename", (req, res) => {
  try {
    // const urlQuery = url.parse(req.url, true).query;
    const filename = req.params.filename;

    if (filename === undefined) throw new Error("query not defined!");

    let options = {
      root: __dirname,
      headers: {}
    }

    res.sendFile(`./Files/${filename}`, options);
  } catch (err) {
    res.status(500);
    res.json({ message: "Internal Error!" });
  }
});

app.listen(serverPort, () => {
  console.log("Server is running on port " + serverPort);
});
