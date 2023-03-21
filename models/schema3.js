const mongoose=require("mongoose")
const Schema=mongoose.Schema

const sc=new Schema({

_id : Schema.Types.ObjectId,
entreprise : String,
description : String


})

const Model3=mongoose.model("offers",sc)

module.exports= Model3