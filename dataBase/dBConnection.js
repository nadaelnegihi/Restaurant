const mongoose = require('mongoose');
const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected Succefully')
    }catch(error){
  console.log('unable to connect to database',error)
    }
   
}

connectDB()

module.exports = connectDB;