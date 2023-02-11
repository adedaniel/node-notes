const { CustomAPIError } = require("../errors");
const Note = require("../models/Note");

const getAllNotes = async (req, res) => {
  console.log(req.user);
  const { featured, type, keyword, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true";
  }

  if (type) {
    queryObject.type = type;
  }

  if (keyword) {
    queryObject.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  let result = Note.find(queryObject);

  if (sort) {
    result = result.sort(sort.split(",").join(" "));
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  result = result.skip(Number((page - 1) * limit)).limit(limit);

  const notes = await result;
  return res.status(200).json(notes /*total: notes.length*/);
};

const getSingleNote = async (req, res) => {
  const noteToFind = await Note.findById(req.params.noteId);

  if (!noteToFind)
    throw new CustomAPIError(
      404,
      `No note found with id: ${req.params.noteId}`
    );

  return res.status(200).json(noteToFind);
};

const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  return res.status(201).json(newNote);
};

const updateNote = async (req, res) => {
  const noteToUpdate = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    {
      new: true,
      runValidators: true,
      // overwrite: true // This is specfically for PUT operations
    }
  );

  if (!noteToUpdate) throw new CustomAPIError(404, `No record found`);

  return res.status(200).json(noteToUpdate);
};

const deleteNote = async (req, res) => {
  const noteToDelete = await Note.findByIdAndDelete(req.params.noteId);

  if (!noteToDelete) throw new CustomAPIError(404, `No record found`);

  return res.status(200).json({ id: req.params.noteId });
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};
