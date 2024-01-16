const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema =Schema({


    name:  {
        type:String,
        required:true
    },    
 
    

    image:  {
        type:String,
        required:true
    },    
    


    shortdesc:  {
        type:String,
        required:true
    },    



    largedesc:  {
        type:String,
        required:true
    },    



    brand:  {
        type:String,
        required:true
    },    
    



    category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
         required:true
    },


    rating:  {
        type:Number,
        required:true
    },    

    price:  {
        type:Number,
        required:true
    },    
    


})

const Product = new mongoose.model("Product", productSchema)
module.exports = Product