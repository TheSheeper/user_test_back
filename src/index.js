import express from "express"
import { API } from "./routes/routes.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

API(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
