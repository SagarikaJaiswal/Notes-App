const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authenticateUser = require("../middlewares/authenticateUser");

router.use(authenticateUser);

// Route to create a new note for the authenticated user
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.delete("/:id", noteController.deleteNoteById);
router.put("/:id", noteController.updateNoteById);
router.post("/:id/share", noteController.shareNote);

module.exports = router;
