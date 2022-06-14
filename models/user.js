const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide username"],
      minLength: 6,
      maxLength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must provide email"],
      minLength: 10,
      maxLength: 40,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
      minLength: 6,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
