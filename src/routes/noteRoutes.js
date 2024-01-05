const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authenticateUser = require("../middlewares/authenticateUser");

// Apply the authenticateUser middleware to protect this route
router.use(authenticateUser);

// Route to create a new note for the authenticated user
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.delete("/:id", noteController.deleteNoteById);
router.put("/:id", noteController.updateNoteById);
router.post("/:id/share", noteController.shareNote);
// ... other note routes

module.exports = router;
