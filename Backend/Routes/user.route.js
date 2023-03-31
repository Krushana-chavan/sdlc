const { Authentication } = require("../middleware/Authentication");

const express = require("express");
const { UserController } = require("../controllers/user.controller");

const Userrouter = express.Router();

/* READ */
Userrouter.get("/:id", Authentication, UserController.getUser);
module.exports = {
  Userrouter,
};
