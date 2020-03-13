const express = require('express')
const ejs = require('ejs')
const multer = require('multer')
const path = require('path')
const app = express()
const port = process.env.PORT ||  3000;
//multer part
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myuploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      console.log(file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      console.log(file)
    }
  })
   
var upload = multer({
   storage: storage 
  }).single('profilepic')
console.log(upload)
//set up ejs
app.set("view engine","ejs")
//static folder
app.use(express.static("./public"))

app.get('/',(req, res) => {
    res.render("index")
})
//Desc
app.post("/upload",(req, res) => {
  upload(req, res, error => {
  if (error) {
    res.render("index",{message: error})
  }else{
    res.render("index",{
      message: "Successfully submited",
      filename: `myuploads/${req.file.filename}`
    })
  }
})})

app.listen(port, () => console.log(`Server is running at port ${port}`))