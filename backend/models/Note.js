const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    // min
    // max
    // defaultValue
    // enum
    // unique
    // validate: for custom validators
    // @see https://mongoosejs.com/docs/validation.html
    type: String,
    required: [true, "title is required"],
    trim: true,
    maxLength: [50, "title can not be more than 50 characters"],
  },
  content: { type: String, required: [true, "content is required"] },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now() },
  type: {
    type: String,
    enum: {
      values: ["task", "todo", "note", "other"],
      message: "{VALUE} is not a valid note type",
    },
    default: "note",
  },
});

module.exports = mongoose.model("Note", NoteSchema);
