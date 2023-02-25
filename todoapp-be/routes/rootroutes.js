const express = require("express");
const routes = express.Router();

routes.use("/todo", require("./todoRoutes"));
routes.use("/user", require("./userroutes"));

module.exports = routes;
