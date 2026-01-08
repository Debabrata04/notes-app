const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// Create note
router.post("/", auth, async (req, res) => {
  const note = await Note.create({
    ...req.body,
    user: req.user
  });
  res.json(note);
});

// Delete note
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
