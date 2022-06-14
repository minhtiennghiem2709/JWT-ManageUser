const express = require("express")
const route = express.Router()
const {
  authenticationMiddleware,
  authenticationAdminMiddleware,
} = require("../middleware/auth")

const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController")
route.route("/register").post(registerUser)
route.route("/login").get(loginUser)
route.route("/").get(authenticationMiddleware, getAllUsers)
route.route("/:id").delete(authenticationAdminMiddleware, deleteUser)
module.exports = route
