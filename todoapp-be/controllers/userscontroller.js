const User = require("../schema_models/userschema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.signUp = (req, res) => {
  //can be use pre function to generate hash which commented in userschema
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(req.body.password);
  const userData = new User({ ...req.body, password: hash });

  //====>for pre fucntion
  //const userData = new User({req.body});

  userData.save((error, doc) => {
    if (error && error.code === 11000) {
      return res.send({
        status: "400",
        message: "Email already exists",
      });
    } else if (error) {
      return res.send({
        status: "400",
        message: "Document not save",
      });
    } else {
      return res.send({
        status: "200",
        message: "Document saved",
        doc,
      });
    }
  });
};

//in this use direct compareSync and jwt here while can use
//separate function which commented in userschema.js file
//in compareSync function 1st para uncrypt front end pass
//and 2nd para hash password came from database
module.exports.login = async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });
  const checkpass = bcryptjs.compareSync(req.body.password, userData.password);
  //for separate function
  //   const checkpass = userData.comparePassword(req.body.password);
  //   const token = userData.generateToken();

  const token = jwt.sign({ id: userData._id }, process.env.JWT_KEY);
  userData.tokens.push(token);
  User.findByIdAndUpdate(userData._id, userData, (error, doc) => {
    if (!error) {
      return res.send({
        status: "200",
        message: "user login succussfully",
      });
    } else {
      return res.send({
        status: "500",
        message: "error occured",
      });
    }
  });
};

module.exports.logOut = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  try {
    const result = await User.updateOne(
      { tokens: [token] },
      { $unset: { tokens: [token] } }
    );
    return res.send({
      status: "200",
      message: "token remove",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: "500",
      message: "error occurred",
    });
  }
};
