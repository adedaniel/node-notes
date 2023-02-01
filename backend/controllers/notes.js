const Note = require("../models/Note");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllNotes,
};
