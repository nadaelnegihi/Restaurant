
const router = require("express").Router()
const {signUp,login} = require('../controller/authController');
//const { auth } = require("../middleware/authMiddleware");

//const userModel = require('../models/userModel');



router.post("/signup", signUp)
router.post("/login",login);




module.exports = router;