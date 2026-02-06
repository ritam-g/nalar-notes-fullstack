const express = require("express");
const noteModel = require("./models/note.model");
const cors = require('cors');
const path = require('path');//! for thi smodule we will get the __dirname ther will be locaiotn of app.js where its located 


//! ALL MIDDLEWARE 
const app=express()
app.use(express.json())
app.use(cors())
//! static file is checking any requrestis is this exiest in the puclic foler so 
//! it will directly wwhow that  
app.use(express.static("./public"))
//* USER WILL GET DATA   //NOTE - find 
app.get('/api/note',async(req,res)=>{
   const notes= await noteModel.find()
   res.status(200).json({
    message:"you note data is created",
    notes
   })
})

//* USER WILL CRATE DATA POST //NOTE - create
app.post('/api/note',async(req,res)=>{
    const {title,content}=req.body
   const note= await noteModel.create({title,content})
   res.status(201).json({
    message:"note is created ",
    note
   })
})
//* user can update data using post //NOTE - findByIdAndUpdate
app.patch('/api/note/:id',async(req,res)=>{
    const {title,content}=req.body
    const {id}=req.params
    let  updateNote
    if(title&&content){
        updateNote= await noteModel.findByIdAndUpdate(id,{title,content})
       res.status(200).json({
        message:'data is updated ',
        updateNote
       })
    }
    else{
        title? updateNote=await noteModel.findByIdAndUpdate(id,{title}):content?updateNote=await noteModel.findByIdAndUpdate(id,{content}):''
        res.status(201).json({
            message:"note is updated ",
            updateNote
        })
    }
}) 

//* USER CAN DELETE HIS POST  //NOTE -  findByIdAndDelete
app.delete('/api/note/:id',async(req,res)=>{
    const {id}=req.params
    const deltedData=await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"use deleted",
        deltedData
    })
}) 


//* UNIVERSAL ROUTE WILL BE HERE which i use to for app.use  
app.use('*name',(req,res)=>{
    //! IF THER IS ANY UNKNOW ROUTE SO IT WILL SHOW THSI INDX.HTML FILE ROUTE 
    //! BUT ITS NOT GOOD OF DING FULL FILE OF THE YOUR SYSTEM 
    //! FOR THAT WE HAVE  
    console.log(__dirname);
      //__dirname is the locaiton of till backend to src file 
    res.sendFile(path.join(__dirname,'..','\\public\\index.html'))
    
})


module.exports=app