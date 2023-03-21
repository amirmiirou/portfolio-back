const mongoose=require("mongoose")


const Schema=mongoose.Schema

const sc=new Schema({

    _id : mongoose.Schema.Types.ObjectId,
    email : String ,
    password : String 

})



const Model1=mongoose.model("users",sc)


module.exports = Model1