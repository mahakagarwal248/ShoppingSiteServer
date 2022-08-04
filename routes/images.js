import express from "express";
import multer from "multer";
import { getImage, postImage } from "../controllers/Images.js";
const app = express();
const router = express.Router();
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.post("/postImage/:id", upload.single("file"), postImage);

router.get("/getImage/:id", getImage);

export default router;
