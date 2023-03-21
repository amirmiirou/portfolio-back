const express=require("express")
const fs=require("fs")
const nodemailer=require("nodemailer")
const cors=require("cors")
const mongoose=require("mongoose")
const formidable = require("formidable")
const Model=require("./models/schema")
const Model1=require("./models/schema1")
const Model3=require("./models/schema3")
const { ObjectId } = require("mongodb")

let server= express();

server.use(cors({origin: "http://localhost:3000"}))
server.use(express.json())  //this is to accept data in json format 
server.use(express.urlencoded({extended:false}))   //this is to decode the data send throught html form

mongoose.connect("mongodb+srv://amir:naitseddik@ressources.2emyuiu.mongodb.net/?retryWrites=true&w=majority")

server.post("/register",(req,result)=>{
 new Model3({
_id: new ObjectId(),
entreprise : req.body.c,
description : req.body.d
}).save().then(()=>{
const transport= nodemailer.createTransport({service:"gmail",auth:{user:"miroua132@gmail.com",pass:"fsfkpbootlxlpjja"}}) 
transport.sendMail({from:"miroua132@gmail.com",to:"miroua132@gmail.com",subject:`job offer from ${req.body.c}`,text:req.body.d},(err,info)=>{
if(err){
result.send("data saved + email not sent")
}else{
result.send("email sent + data saved")
}})
}).catch(()=>{
result.send("data not saved")
})
})



server.post("/folder",(req,res)=>{
const form=new formidable.IncomingForm()
form.parse(req,(err,fields,files)=>{if(err) throw err ;
fs.rename(files.upload.filepath,`C:/Users/leo/Desktop/site-web/portfolio/server/images/${fields.projectSelected}/${files.upload.originalFilename}`,()=>{})
})
res.redirect("http://localhost:3000")
})



server.post("/addNewProject",(req,res)=>{
new Model({
_id : new ObjectId(),
name : req.body.a ,
description : req.body.b 
}).save()
fs.mkdirSync(`./images/${req.body.a}`)
Model.find().then((result)=>{
let table=[]
result.map((object)=>{
let nameProject=object.name
let projectDescription=object.description
let instant=[]
fs.readdirSync(`./images/${nameProject}`).map((object)=>{
instant.push(fs.readFileSync(`./images/${nameProject}/${object}`))
})
table.push({name:nameProject,description:projectDescription,images:instant})
})
res.send(table)
})
})



server.get("/names",(req,res)=>{
Model.find().then((result)=>{
let table=[]
result.map((object)=>{
let nameProject=object.name
let projectDescription=object.description
let instant=[]
fs.readdirSync(`./images/${nameProject}`).map((object)=>{
instant.push(fs.readFileSync(`./images/${nameProject}/${object}`))
})
table.push({name:nameProject,description:projectDescription,images:instant})
})
res.send(table)
})
})







server.post("/envoyerMessage",(req,res)=>{


var transport=nodemailer.createTransport({service:"gmail",auth:{user:"miroua132@gmail.com",pass:"fsfkpbootlxlpjja"}})
transport.sendMail({from:"miroua132@gmail.com",to:"miroua132@gmail.com",subject:req.body.c,text:req.body.d},(err,info)=>{
  
  if(err){console.log(err)}else{res.send("message transmitted")}}


)




})



server.get("/login",(req,res)=>{


Model1.find().then((result)=>{
res.send(result)

})



})

server.post("/users",(req,res)=>{
  
const z=new ObjectId()
new Model1({

  _id : z ,
  email : req.body.a ,
  password : req.body.b 


}).save()


})

server.listen(process.env.PORT || 3001);
