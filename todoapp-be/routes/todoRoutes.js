const express = require("express");
const routes = express.Router();

const {
  toDoCreate,
  toDoGet,
  toDoEdit,
  toDoUpdate,
  toDoDelete,
} = require("../controllers/todocontroller");

routes.post("/create", toDoCreate);

routes.get("/get", toDoGet);

routes.put("/update", toDoUpdate);

routes.delete("/delete", toDoDelete);

module.exports = routes;
