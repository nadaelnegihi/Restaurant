const express = require("express")
const dotenv =require("dotenv")
const connectDB = require("./dataBase/dBConnection")
const router = require("./routes/auth.router")
const productRouter = require("./routes/product.router")

dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT 

app.use("/api/v1",router)
app.use("/api/v1",productRouter)
//db connection 
connectDB()
//server
app.listen(port,()=>{
console.log(`Server is working on port ${port}`)
}) 



