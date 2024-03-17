const {
  login,
  register,
  getAllUsers,
  logOut,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
// router.get("/game/:id", game)

module.exports = router;
