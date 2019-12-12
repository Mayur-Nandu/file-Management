const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
var express = require('express');
var router = express.Router();


router.post("/signup", async (req, res) => {

  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });

  // res.status(200).send(token);
});

router.post("/login", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) {
    // console.log(error)   ;
    return res.status(400).send(error.details[0].message);
  }

  //find an existing user

  let user = await User.findOne({ email: req.body.email});
  if (!user) return res.status(400).send("sign in First");
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    // res == true
    if(err){
      console.log("ERROR");
    }
    if(result){
      console.log("Password Matched");
      const token = user.generateAuthToken();
      res.header("x-auth-token", token).status(200).send('OK');
      // res.status(200).send(token);
    }
    else{
      console.log("wrong Password");
      const token = user.generateAuthToken();
      res.status(400).send("invalid password");
      // res.status(400).send("invalid request");
    }

  });
});

router.get('/logout', (req, res) =>
{
  res.header("x-auth-token", '').send("successfully logged out")
});

module.exports = router;
