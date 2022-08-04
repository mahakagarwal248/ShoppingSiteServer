import images from "../models/images.js";

import sharp from "sharp";
import path from "path";
import fs from "fs";

export const postImage = async (req, res) => {
  const {id: _id} = req.params;
  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize(200, 200)
    .jpeg({ quality: 90 })
    .toFile(path.resolve(req.file.destination, "resized", image));
  fs.unlinkSync(req.file.path);

  var obj = {
    img: {
      data: fs.readFileSync(
        path.join(req.file.destination + "/resized/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    userId:_id,
  };
  images.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
};

export const getImage = async (req, res) => {
  const {id: _id} = req.params
  try {
    const pic = await images.findOne({userId: _id});
    res.status(200).json(pic);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}