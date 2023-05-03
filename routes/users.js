var express = require("express");
const UserController = require("../modules/users/user.controller");
var router = express.Router();
const userController = new UserController();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", userController.getOneUser.bind(userController));

module.exports = router;
