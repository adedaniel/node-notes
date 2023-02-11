const express = require("express");
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, getAllNotes);
router.get("/:noteId", authenticate, getSingleNote);
router.post("/", authenticate, createNote);
router.patch("/:noteId", authenticate, updateNote);
router.delete("/:noteId", authenticate, deleteNote);

module.exports = router;
