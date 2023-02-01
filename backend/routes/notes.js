const express = require("express");
const Note = require("../models/Note");
const { getAllNotes } = require("../controllers/notes");

const router = express.Router();

// let notes = [
//   {
//     id: "1",
//     title: "Things to talk about",
//     content:
//       "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
//   },
// ];

router.get("/", getAllNotes);

router.get("/:noteId", async (req, res) => {
  try {
    const noteToFind = await Note.findById(req.params.noteId);

    // let noteToFind = notes.find((note) => note.id === req.params.noteId);
    if (!noteToFind)
      return res
        .status(404)
        .json({ error: `No note found with id: ${req.params.noteId}` });

    return res.status(200).json(noteToFind);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    // const newNote = { id: nanoid(), ...req.body };
    // notes = [...notes, newNote];
    return res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/:noteId", async (req, res) => {
  try {
    const noteToUpdate = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      {
        new: true,
        runValidators: true,
        // overwrite: true // This is specfically for PUT operations
      }
    );

    // let noteToUpdate = notes.find((note) => note.id === req.params.noteId);
    if (!noteToUpdate)
      return res.status(404).json({ error: `No record found` });

    // const updatedNotes = notes.map((note) =>
    //   note.id === req.params.noteId
    //     ? { ...note, ...req.body, id: note.id }
    //     : note
    // );

    // notes = updatedNotes;

    return res.status(201).json(noteToUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:noteId", async (req, res) => {
  try {
    const noteToDelete = await Note.findByIdAndDelete(req.params.noteId);

    // let noteToDelete = notes.find((note) => note.id === req.params.noteId);
    if (!noteToDelete)
      return res.status(404).json({ error: `No record found` });

    // const updatedNotes = [...notes].filter(
    //   (note) => note.id !== req.params.noteId
    // );

    // notes = updatedNotes;

    return res.status(200).json({ id: req.params.noteId });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
