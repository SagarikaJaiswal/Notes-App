const Note = require("../models/noteModel");
const User = require("../models/userModel");
const getAllNotes = async (req, res) => {
  try {
    // Fetch all notes for the authenticated user
    const notes = await Note.find({ owner: req.user.userId });

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    //console.log(title, content);
    // Create a new note for the authenticated user
    const newNote = new Note({
      title,
      content,
      owner: req.user.userId, // Set the owner to the authenticated user's ID
    });
    //console.log(newNote);
    // Save the new note to the database
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find the note by ID and owner (authenticated user)
    const note = await Note.findOne({ _id: noteId, owner: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error getting note by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find and delete the note by ID and owner (authenticated user)
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      owner: req.user.userId,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    // Find and update the note by ID and owner (authenticated user)
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: req.user.userId },
      { title, content },
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const shareNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { username } = req.body;
    console.log(req.body);

    // Find the note by ID and owner (authenticated user)
    const note = await Note.findOne({ _id: noteId, owner: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Find the user to share with
    const userToShareWith = await User.findOne({
      username,
    });

    if (!userToShareWith) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the note is already shared with the user
    if (note.sharedWith.includes(userToShareWith._id)) {
      return res
        .status(400)
        .json({ message: "Note is already shared with this user" });
    }

    // Share the note with the user
    note.sharedWith.push(userToShareWith._id);
    await note.save();

    res.json({ message: "Note shared successfully" });
  } catch (error) {
    console.error("Error sharing note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  deleteNoteById,
  updateNoteById,
  shareNote,
};
