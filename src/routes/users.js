var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);
router.post("/", UserController.postUser);
router.post("/login", UserController.loginUser);

module.exports = router;
