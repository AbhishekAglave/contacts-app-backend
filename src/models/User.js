const mongoose = require("./dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    // defining schama for the user model
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
    // ,
    // timestamp: {
    //   type: Date,
    //   defaultValue: Date.now
    // }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); // creating a model instance and collection in database with given name and schema

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw err;
  }
};

const postUser = async (user) => {
  const document = await User.findOne({ username: user.username });
  if (document) throw { message: "Username already exists" };
  if (!document) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw err;
      bcrypt.hash(user.password, salt, async function (err, hash) {
        if (err) throw err;
        const newUser = new User({
          username: user.username,
          salt,
          password: hash
        });
        return await newUser.save();
      });
    });
  }
};

const loginUser = async (body) => {
  const user = await User.findOne({ username: body.username });
  if (!user) throw { message: "incorrect username" };
  try {
    const match = await bcrypt.compare(body.password, user.password);
    if (match) {
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
      return { message: `logged in successfully`, token };
    } else {
      throw { message: "incorrect password" };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  User,
  getUsers,
  postUser,
  loginUser
};
