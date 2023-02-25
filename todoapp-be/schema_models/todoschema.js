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
//in first parameter define database collection name
const Todo = mongoose.model("lists", todoSchema);

module.exports = Todo;
