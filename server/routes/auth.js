const router = require("express").Router();
const { json } = require("body-parser");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PRIVATE_RSA_KEY = fs.readFileSync("./rsa/key");

router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email }).exec((error, user) => {
    if (user && bcrypt.compareSync(request.body.password, user.password)) {
      const token = jwt.sign({}, PRIVATE_RSA_KEY, {
        algorithm: "RS256",
        subject: user._id.toString(),
      });
      response.status(200).json(token);
    } else {
      response.status(401).json("Login failed !");
    }
  });
});

router.post("/register", (request, response) => {
  const newUser = new User({
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(8)),
  });
  newUser.save((error) => {
    if (error) {
      return response.status(500).json("An internal occured when registrating");
    } else {
      return response.status(201).json("Register successfully !");
    }
  });
});

module.exports = router;
