import 'dotenv/config'
import express from "express"
import connectdb from "./utils/connectdb.js";
import router from "./routes/routes.js";
import cors from "cors"
import axios from 'axios';




const app = express()
app.use(express.json())
app.use(cors({
  origin: process.env.FRONT_URL, 
  methods: ["GET", "POST","DELETE"],
  credentials: true
}));
app.use("/api",router)

// self ping to prevent sleep onrender
const ping = async () => {
  try{
    const resp =await axios.get( "https://lightchan.onrender.com/api/ping")
    console.log(resp.status)

  }catch(error){
    console.log(error)
  }
}

app.get('/ping',(req,res) => {
    res.status(200).send("ping pong ")
})



const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
    connectdb();
    ping();
    setInterval(ping,5*60*1000)
})