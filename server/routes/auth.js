const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PRIVATE_RSA_KEY = fs.readFileSync("./rsa/key");
const PUBLIC_RSA_KEY = fs.readFileSync("./rsa/key.pub");

router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email }).exec((error, user) => {
    if (user && bcrypt.compareSync(request.body.password, user.password)) {
      const token = jwt.sign({}, PRIVATE_RSA_KEY, {
        algorithm: "RS256",
        expiresIn: "50s",
        subject: user._id.toString(),
      });
      response.status(200).json(token);
    } else {
      response.status(401).json("Login failed !");
    }
  });
});

router.get("/token/refresh", (request, response) => {
  const token = request.headers.authorization;
  if (token) {
    jwt.verify(token, PUBLIC_RSA_KEY, (error, decoded) => {
      if (error) {
        return response.status(401).json("Invalid token!");
      } else {
        const newToken = jwt.sign({}, PRIVATE_RSA_KEY, {
          algorithm: "RS256",
          expiresIn: "15s",
          subject: decoded.sub,
        });
        response.status(200).json(newToken);
      }
    });
  } else {
    response.status(403).json("No token");
  }
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
