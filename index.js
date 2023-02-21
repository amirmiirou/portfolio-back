const express=require("express")
const mysql=require("mysql")
const fs=require("fs")
const nodemailer=require("nodemailer")
const formidable=require("formidable")


let server= express();
server.use((req,res,next)=>{
res.header('Access-Control-Allow-Origin','*')

res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')

res.header('Access-Control-Allow-Headers','Content-Type')
next();

})



server.use(express.json())  //this is to accept data in json format 
server.use(express.urlencoded())   //this is to decode the data send throught html form



server.get("/",(req,res)=>{

  res.sendFile(__dirname+"/index.html")


})


let x=null
server.post("/register",(req,result)=>{
x=req.body
const transport= nodemailer.createTransport({service:"gmail",auth:{user:x.a,pass:"fsfkpbootlxlpjja"}}) 
transport.sendMail({from:x.a,to:"miroua132@gmail.com",subject:`job offer from ${x.c}`,text:x.d},(err,info)=>{
if(err){console.log(err)}else{console.log(info.response)}}) 
var createConnection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})

createConnection.connect((err)=>{if(err)throw err;})
createConnection.query("insert into offers ( email, entreprise_name, description) values(?,?,?)",[x.a,x.c,x.d],(err,res)=>{
if(err)throw err;
createConnection.end((err)=>{if(err){console.log(err.message)}})
})

})



server.post("/folder",(req,res)=>{
  
  var formulaire=new formidable.IncomingForm();
  formulaire.parse(req,(err,fields,files)=>{

   // var oldpath=files.upload.filepath
            
    // var newpath="C:/Users/leo/Desktop/site-web/portfolio/client/src/"+files.upload.originalFilename
    
    // fs.rename(oldpath,newpath,(err)=>{if(err)throw err;res.send("file uploaded")})   
  console.log(fields.test)
    var createConnection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})

    createConnection.connect((err)=>{if(err)throw err;})
    
    fs.readFile(files.upload.filepath,(err,data)=>{
      if(err)throw err
      createConnection.query("insert into images ( id, image) values(?,?)",[fields.test,data],(err,res)=>{
        if(err)throw err;
        
        createConnection.end((err)=>{if(err){console.log(err.message)}})
    
        
        })
    
    
    
    })  
    
     

res.send("file uploaded")

  })

  
  
  })

server.get("/images",(request,response)=>{
  var createConnection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})

  createConnection.connect((erreur)=>{if(erreur)throw erreur})
  createConnection.query(
    "select identifiant,name,description,image from projectsimage p, images i where p.identifiant=i.id",(err,res)=>{
    if(err)throw err;
    
   // fs.writeFileSync("idex.jpg",res[0].image)
    
    
    response.send(res)
    
    createConnection.end((err)=>{if(err)throw err})
  
  })  
  
    

})

server.post("/addNewProject",(req,res)=>{

//var formul=new formidable.IncomingForm();
//formul.parse(req,(err,fields,files)=>{
//if(err)throw err;
var createConnection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})
createConnection.connect((err)=>{if(err)throw err; 
createConnection.query("insert into projectsimage (name ,description) values (?,?)",[req.body.a,req.body.b],(err)=>{
if(err)throw err
  
})})



//})
res.send("project added")

})

server.get("/names",(req,res)=>{

  var createConnection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})
  createConnection.connect((err)=>{if(err)throw err; 
  createConnection.query("select identifiant,name from projectsimage",(err,result)=>{
  if(err)throw err;
  res.send(result)
  createConnection.end((err)=>{if(err)throw err})    
  })})



})



server.post("/envoyerMessage",(req,res)=>{

//var form=new formidable.IncomingForm()
//form.parse(req,(err,fields,files)=>{

var transport=nodemailer.createTransport({service:"gmail",auth:{user:"miroua132@gmail.com",pass:"fsfkpbootlxlpjja"}})
transport.sendMail({from:"miroua132@gmail.com",to:"miroua132@gmail.com",subject:req.body.c,text:req.body.d},(err,info)=>{
  
  if(err){console.log(err)}else{res.send("message transmitted")}}


)

//})


})



server.get("/login",(req,res)=>{


//var form=new formidable.IncomingForm()
//form.parse(req,(err,fields,files)=>{
  
  //if(err)throw err 
  var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})
  connection.connect((err)=>{if(err)throw err;

  connection.query("select * from accounts ",(err,result)=>{

if(err){
console.log(err)

}else{


res.send(result)




connection.end(()=>{})
}


  })
  })

//}

//)



})

server.post("/users",(req,res)=>{
  
  const base=mysql.createConnection({host:"localhost",user:"root",password:"",database:"joboffers"})
  base.connect((err)=>{if(err)throw err;
  
  base.query("insert into accounts(email,pass) values (?,?)",[req.body.a,req.body.b],(err,result)=>{

if(err){


}else{

res.send(result)

base.end((err)=>{console.log(err)})


}

  })
  
  })


})

server.listen(3001);