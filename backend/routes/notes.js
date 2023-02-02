const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:noteId", getSingleNote);
router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

module.exports = router;
