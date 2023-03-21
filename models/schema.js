const mongoose=require("mongoose")
const Schema=mongoose.Schema


const sc=new Schema({

_id : mongoose.Schema.Types.ObjectId,
name : String ,
description : String 

})


const Model=mongoose.model("projectsimages",sc)



module.exports=Model