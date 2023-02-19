const Todo = require("../schema_models/todoschema");

module.exports.toDoCreate = (req, res) => {
  const data = req.body;
  const todo_body = new Todo(req.body);
  console.log(todo_body);
  todo_body.save((error, doc) => {
    if (!error) {
      console.log(doc);
      return res.send({
        status: "200",
        message: "Document saved",
        data: doc,
      });
    } else {
      return res.send({
        tatus: "500",
        message: "error occured",
      });
    }
  });
};

module.exports.toDoGet = async (req, res) => {
  console.log(req.query.id);
  if (req.query.id) {
    Todo.findById(req.query.id, (error, doc) => {
      if (!error) {
        return res.send({
          status: "200",
          message: "editable document",
          data: doc,
        });
      } else {
        return res.send({
          tatus: "500",
          message: "error occured",
        });
      }
    });
  } else {
    const result = await Todo.find();
    res.send({ status: "200", message: "Success", data: result });
  }
};

module.exports.toDoUpdate = (req, res) => {
  console.log("updated", req.query.id);
  Todo.findByIdAndUpdate(req.query.id, req.body, (error, doc) => {
    if (!error) {
      console.log("updated", doc);
      return res.send({
        status: "200",
        message: "editable document",
        data: doc,
      });
    } else {
      return res.send({
        status: "500",
        message: "error occured",
      });
    }
  });
};

module.exports.toDoDelete = async (req, res) => {
  console.log("delete", req.query.id);

  if (req.query.id) {
    Todo.findByIdAndRemove(req.query.id, (error, doc) => {
      if (error) return res.status(500).send(error);
      return res.status(200).send({
        message: "document deleted",
      });
    });
  } else {
    await Todo.remove()
      .then(
        res.send({
          message: "all document deleted",
        })
      )
      .catch((error) => {
        res.send({
          message: "error occured",
        });
      });
  }
};
