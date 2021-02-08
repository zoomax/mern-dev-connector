const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      text: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "users" },
      avatar: {
        type: String,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("posts", PostSchema);
