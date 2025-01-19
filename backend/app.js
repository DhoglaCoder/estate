import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js";
import bodyParser from "body-parser";
import listingRoutes from "./routes/listRoute.js"

const app = express();
const port = 3000

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


//db connection
connectDb();

app.use('/api/listings', listingRoutes);

app.get("/",(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>{
    console.log("Server is running");
})