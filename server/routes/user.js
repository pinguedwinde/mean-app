const router = require("express").Router();
const User = require("../models/user.model");
const fs = require("fs");
const PUBLIC_RSA_KEY = fs.readFileSync("./rsa/key.pub");
const jwt = require("jsonwebtoken");

function isLoggedIn(request, response, next) {
  const token = request.headers.authorization;
  if (token) {
    jwt.verify(token, PUBLIC_RSA_KEY, (error, decoded) => {
      if (error) {
        return response.status(401).json("Invalid token!");
      } else {
        const sub = decoded.sub;
        User.findOne({ _id: sub }, (mongooseError, retrievedUser) => {
          if (mongooseError || !retrievedUser) {
            return response.status(500).json("Internal Server Error!");
          } else {
            request.user = retrievedUser;
            console.log(request.user);
            next();
          }
        });
      }
    });
  } else {
    request.status(401).json("Unauthorized user");
  }
}

router.get("/current", isLoggedIn, (request, response) => {
  response.status(200).json(request.user);
});

module.exports = router;
