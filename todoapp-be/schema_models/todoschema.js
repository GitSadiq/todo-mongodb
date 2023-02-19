//In this file you are define the structure of your data
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema({
  item: {
    type: String,
    required: true,
  },
  status: Boolean,
});

//compiling schema in model
const Todo = mongoose.model("userdatas", todoSchema);

module.exports = Todo;
