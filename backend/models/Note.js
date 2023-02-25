const mongoose = require("mongoose");
const MongooseErrors = require("mongoose-errors");

const NoteSchema = new mongoose.Schema(
  {
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
    content: { type: String, default: "" },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
    type: {
      type: String,
      enum: {
        values: ["task", "todo", "note", "other"],
        message: "'{VALUE}' is not a valid note type",
      },
      default: "note",
    },
  },
  { timestamps: true }
);

NoteSchema.plugin(MongooseErrors);

module.exports = mongoose.model("Note", NoteSchema);
