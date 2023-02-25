const express = require("express");
const routes = express.Router();

const { signUp, login, logOut } = require("../controllers/userscontroller");
const verifyToken = require("../middleware/verifyToken");

routes.post("/signup", signUp);
routes.post("/login", login);
routes.post("/logout", verifyToken, logOut);

module.exports = routes;
