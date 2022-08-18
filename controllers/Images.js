// import images from "../models/images.js";
import user from "../models/user.js";

import sharp from "sharp";
import path from "path";
import fs from "fs";

export const postImage = async (req, res) => {
  const { id: _id } = req.params;
  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize(200, 200)
    .jpeg({ quality: 90 })
    .toFile(path.resolve(req.file.destination, "resized", image));
  fs.unlinkSync(req.file.path);

  var obj = {
    profilePicture: {
      data: fs.readFileSync(
        path.join(req.file.destination + "/resized/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    userId: _id,
  };
  user.findByIdAndUpdate(_id, obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
};

export const getImage = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const users = await user.findById(_id)
    const pic = await users.profilePicture;
    res.status(200).json(pic);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
