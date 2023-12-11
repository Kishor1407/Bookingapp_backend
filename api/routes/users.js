const express = require("express");
// const {
//   deleteUser,
//   updateUser,
//   getUser,
//   getUsers,
// } = require("../controllers/user.js");
const {updateUser,deleteUser,getUser,getUsers} = require("../controllers/user.js");
// const updateUser = require("../controllers/user.js");
// const getUser = require("../controllers/user.js");
// const getUsers = require("../controllers/user.js");
const {verifyAdmin,verifyToken,verifyUser}  = require("../utils/verifyToken.js");

const router = express.Router();
// Route to check user authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello, user! You are logged in.");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello, user! You are logged in delete now.");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello, delete all accns.");
// });
// Route to update a user
// router.put("/:id", verifyUser, updateUser);

router.route("/:id").put(verifyUser,updateUser);
router.route("/:id").delete(verifyUser,deleteUser);
router.route("/:id").get(verifyUser,getUser);
router.route("/").get(verifyAdmin,getUsers);

// Route to delete a user
// router.delete("/:id", verifyUser, deleteUser);

// // Route to get a user by ID
// router.get("/:id", verifyUser, getUser);

// // Route to get all users (for admin)
// router.get("/", verifyAdmin, getUsers);

module.exports = router;
