const express = require("express");
const router = express.Router();

const userData = require("../Controllers/user-controller");

router.route("/contactdata").post(userData.contactData);

module.exports = router;
