import 'dotenv/config'
import express from "express"
import connectdb from "./utils/connectdb.js";
import router from "./routes/routes.js";
import cors from "cors"




const app = express()
app.use(express.json())
app.use(cors({
  origin: process.env.FRONT_URL, 
  methods: ["GET", "POST","DELETE"],
  credentials: true
}));
app.use("/api",router)


const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
    connectdb()
})