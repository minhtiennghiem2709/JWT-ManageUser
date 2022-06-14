const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const passwordhash = await bcrypt.hash(req.body.password, salt)

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: passwordhash,
    })

    const user = await newUser.save()
    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const loginUser = async (req, res) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username })
    if (!userCheck) {
      res.status(404).send("Username not exist")
    } else {
      const validpassword = await bcrypt.compare(
        req.body.password,
        userCheck.password
      )

      if (!validpassword) {
        res.status(404).send("Wrong password")
      }
      if (userCheck && validpassword) {
        const accesstoken = jwt.sign(
          {
            id: userCheck.id,
            isAdmin: userCheck.isAdmin,
          },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "120s" }
        )
        const { password, ...others } = userCheck._doc
        res.status(200).json({ others, accesstoken })
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({ users, nbHits: users.length })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    console.log(req.params)
    const { id: userId } = req.params

    const user = await User.findOneAndDelete({ _id: userId })
    res.status(200).json({ user: null, message: "Delete successfully" })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = { registerUser, loginUser, getAllUsers, deleteUser }
