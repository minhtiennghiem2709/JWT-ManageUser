const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./db/connect")
const cookieParser = require("cookie-parser")
const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")

const app = express()

require("dotenv").config()

app.use(morgan("tiny"))
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT || 3000

const users = require("./routes/auth")
app.use("/api/v1", users)

app.get("/", (req, res) => {
  res.send("Hello")
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
