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
    maxLength: [50, "title can not bemore than 50 characters"],
  },
  content: { type: String, required: [true, "content is required"] },
});

module.exports = mongoose.model("Note", NoteSchema);
