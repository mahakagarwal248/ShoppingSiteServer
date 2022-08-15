import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    img: {
      data: Buffer,
      contentType: String,
    },
    userId: {  type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null  },
  },
  { timestamps: true }
);

export default mongoose.model("images", imageSchema);
