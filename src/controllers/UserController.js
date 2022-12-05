const User = require("../models/User");

const getUsers = async (req, res) => {
  
  try {
    const users = await User.getUsers(req.headers.authorization.split(" ")[1]);
    res.send(users);
  } catch (err) {
    res.status(400)
    res.send(err)
  }
};
const postUser = async (req, res) => {

  const onValidUsername = (val) => {
    const usernameRegex = /^[a-z0-9_.]+$/;
    return usernameRegex.test(val);
  };

  if (onValidUsername(req.body.username)) {
    if (req.body.password) {
      try {
        const newUser = await User.postUser({
          username: req.body.username,
          password: req.body.password
        });
        res.status(201);
        res.send({ message: "User created successfully" });
      } catch (error) {
        res.status(400);
        res.send(error);
      }
    } else {
      res.status(400);
      res.send({ message: "Password cannot be empty" });
    }
  } else {
    res.status(400);
    res.send({
      message: "Username should only contain ( a-z ), ( 0-9 ) ( _ ), ( . )"
    });
  }
};

const loginUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400);
    res.send({ message: "username cannot be empty" });
    return;
  }
  if (!req.body.password) {
    res.status(400);
    res.send({ message: "password cannot be empty" });
    return;
  }
  try {
    const result = await User.loginUser(req.body);
    res.send(result);
  } catch (err) {
    res.status(401);
    res.send(err);
  }
};

module.exports = {
  getUsers,
  postUser,
  loginUser
};
