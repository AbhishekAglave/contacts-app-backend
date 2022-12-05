var express = require("express");
var router = express.Router();
const ContactController = require("../controllers/ContactController");

router.get("/", ContactController.getContacts);
router.post("/", ContactController.postContact);
router.put("/", ContactController.putContact);
router.delete("/", ContactController.deleteContact);

module.exports = router;
