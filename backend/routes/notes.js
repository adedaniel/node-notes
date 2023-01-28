const express = require("express");
const { nanoid } = require("nanoid");

const router = express.Router();

let notes = [
  {
    id: "1",
    title: "Things to talk about",
    content:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
];

router.get("/", (req, res) => {
  try {
    return res.status(200).json(notes);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:noteId", (req, res) => {
  try {
    let noteToFind = notes.find((note) => note.id === req.params.noteId);
    if (!noteToFind)
      return res
        .status(404)
        .json({ error: `No note found with id: ${req.params.noteId}` });

    return res.status(200).json(noteToFind);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", (req, res) => {
  try {
    const newNote = { id: nanoid(), ...req.body };
    notes = [...notes, newNote];
    return res.status(200).json(newNote);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/:noteId", (req, res) => {
  try {
    let noteToUpdate = notes.find((note) => note.id === req.params.noteId);
    if (!noteToUpdate)
      return res.status(404).json({ error: `No record found` });

    const updatedNotes = notes.map((note) =>
      note.id === req.params.noteId
        ? { ...note, ...req.body, id: note.id }
        : note
    );

    notes = updatedNotes;

    return res
      .status(201)
      .json({ ...noteToUpdate, ...req.body, id: noteToUpdate.id });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:noteId", (req, res) => {
  try {
    let noteToDelete = notes.find((note) => note.id === req.params.noteId);
    if (!noteToDelete)
      return res.status(404).json({ error: `No record found` });

    const updatedNotes = [...notes].filter(
      (note) => note.id !== req.params.noteId
    );

    notes = updatedNotes;

    return res.status(200).json({ id: req.params.noteId });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
