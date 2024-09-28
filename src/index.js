import express from "express"
import { API } from "./routes/routes.js"
import cors from "cors"

const app = express()
const port = 3000

const corsOptions = {
  origin: 'https://front-flax-alpha.vercel.app/',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())

API(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
