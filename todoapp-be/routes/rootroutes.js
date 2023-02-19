const express = require("express");
const routes = express.Router();

routes.use("/todo", require("./todoRoutes"));

module.exports = routes;
