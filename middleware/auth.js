const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.token

  if (!authHeader) {
    throw newUnauthenticatedError("No token provided")
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
  }
}

const authenticationAdminMiddleware = async (req, res, next) => {
  authenticationMiddleware(req, res, () => {
    try {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
      } else {
        console.log("KO co quyen")
      }
    } catch (error) {
      console.log(error)
    }
  })
}
module.exports = { authenticationMiddleware, authenticationAdminMiddleware }
