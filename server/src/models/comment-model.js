const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CommentSchema.plugin(beautifyUnique);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
