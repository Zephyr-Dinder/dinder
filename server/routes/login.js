const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require('../controllers/authController');

router.get("/showusers", userController.showUsers, (req, res) => { // -> /api/login/showusers
  res.send();
});

router.post("/signIn", userController.verifyUser, authController.setCookie, authController.setSession, (req, res) => {
  // console.log('post for cookie route hit final callback');
  res.status(200).json(res.locals.user);
});


router.post("/signUp", userController.createUser, authController.setCookie, authController.setSession, (req, res) => {
  console.log('Reached the final callback on the route for /signup');
  res.status(200).json(res.locals.user);
});

module.exports = router;
