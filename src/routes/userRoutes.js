// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticateUser");

//router.use(authenticateUser);
router.post("/signup", userController.signup);
router.post("/login", authenticateUser, userController.login);
//router.post("/login", authenticateUser, userController.login);

module.exports = router;
