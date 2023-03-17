const express = require('express');
//body parser for parsing fetch request body, else it will show undefined
const bodyParser = require('body-parser');
const {v4:uuidv4}=require("uuid")
const path = require("path");
const fileupload=require("express-fileupload")
const app = express();
const fs = require('fs');
let port = 5000||process.env.PORT;
app.use(express.static(path.join(__dirname, './front/build')));
app.use(fileupload());

app.use(express.static("uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileid=Date.now() + Math.random()


app.post("/upload", (req, res) => {
    const newpath = __dirname + "/uploads/";
    const file = req.files.file;
    const filename = fileid+file.name;
   
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
     

      res.status(200).send({ message: "File Uploaded", code: 200 , fileID:filename});
    });
  });

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "./front/build/index.html"));
})

app.get("/download",  (req, res)=> {
  const imageID=req.query.id
    // The res.download() talking file path to be downloaded
    res.download(__dirname + "/uploads/"+imageID, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  app.get("/delete",(req,res)=>{
    const imageID=req.query.id
    fs.unlink(__dirname+"/uploads/" + imageID, (err) => {
        if (err) {
            throw err;
        }
   
        res.send("deleted")
    });
  })
  app.post("/save",(req,res)=>{
    console.log("we will send these ids and user info to database : " + req.body)
    res.send("document saved successfully")
  })

  // send uploaded file names as array to see previous data 
  app.get('/files', (req, res) => {
    const folderPath = './uploads';
  
    // Read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error reading folder contents.');
      }
  
      // Extract the file names
      const fileNames = files.map(file => file);
  
      // Send the file names as an array
      res.send(fileNames);
    });
  });
  

app.listen(port,()=>{
    console.log("app is listening on" + port + " port")
    })        