const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
  },
});

//========>use pre function
// userSchema.pre("save", function () {
//   const userdata = this;
//   const salt = bcryptjs.genSaltSync(10);
//   const hash = bcryptjs.hashSync(userdata.password, salt);
//   userdata.password = hash;
// });

//=======>Comparepass
// userSchema.methods.comparePassword = function (frontendPassword) {
//   const user = this;
//   return bcryptjs.compareSync(frontendPassword, user.password);
// };

//========> jwt
// userSchema.methods.generateToken = function () {
//   const user = this;
//   var token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
//   return token;
// };

const User = mongoose.model("users", userSchema);

module.exports = User;
