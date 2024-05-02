const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    decsription:{
        type:String,
        reqire : false
    },
    stock:{
        type:Boolean,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    color:{
        type:String,
        require:false
    },
    yearOfmodel:{
        type:String,
        require:true
    },
    image:{
        type:String,

    },

},{timestamps:true})

const productModel = mongoose.model("product",productSchema)
module.exports=productModel