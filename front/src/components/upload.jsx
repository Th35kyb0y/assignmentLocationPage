import { useState, useRef } from "react";
import "./upload.css"
import { setID } from "../actions/actions"
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const Upload=()=>{
  const dispatch = useDispatch()
  // access redux id state to check wheather user is uploading duplicate file or new
  const uploadedFiles=useSelector((state)=>state.add.ids)
  const [inpValues, setInpV]=useState({
    fieldOne:"",
    fieldTwo:"",
    expDate:"",
    hyperLink:"",
    scopeHyperLink:""
  })
const [file,setFile]=useState("https://icon-library.com/images/image-gallery-icon/image-gallery-icon-14.jpg")
const [fil,setf]=useState()
const [fileName,setFileName]=useState()
const [fileID, setFileID]=useState() 
                          
  const [btnValue,setBtnVal]=useState(true)
 
  
    const fileInputRef = useRef(null);
  
    const handleImageClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      console.log(file);
    };
  const handleInput=(e)=>{
    // handle file and enable or disable uplaod button
    if(e.target.name==="file"){
        setf(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
      // when file select enable upload button

setBtnVal(false)
    }
    setInpV((prev)=> ({...prev,[e.target.name]:e.target.value}))
  }
  const formData = new FormData();
        formData.append("file", fil);
        formData.append("fileName", fileName);
  const handleUpload= async ()=>{
    console.log(inpValues)
  let uploadedFile
    // check if user is uploading same file or new 
     uploadedFiles.forEach((elem)=>{
      // we are extracting image file name from random id 
    uploadedFile= elem.substring(elem.indexOf(".")).includes(fileName) // return true if duplicate file
    
   })
   if(uploadedFile){
    alert("duplicate file")
   }
   else{

    console.log(uploadedFile + " is new file " +fileName)
   
    let settings={
      method:"post",
      Headers:{
        'Content-Type':'Multipart/form-data'
      },
      body:formData
    }
    // we are passing current time , so our fetch req is treated a new req not cached one , 
    // so we can get new image id 
    const currentTime=new Date().getTime()
    const res=await fetch(`http://localhost:5000/upload?refresh=${currentTime}`,settings)
    const result= await res.json()
  // we are sending this id to redux store , so save and download delete component can access it
  if(res.status==200){
     dispatch(setID(result.fileID))
// on successfully upload show success msg
setFile("https://thinkwelty.com/wp-content/uploads/2019/09/uploadsuccessful3-300x245.jpg")
// disable upload btn again
setBtnVal(false)
  }
  else{
    alert("error in uploading file")
    console.log(res)
  }
  }
  }
  
  return(
    <>
    <Box  sx={{
    backgroundColor: '#fff',

    borderBottom:"1px solid black",
    padding: '20px',
    maxWidth:"100%",
    height: 'max-content',
    display:"flex",
    justifyContent:"space-between",
 
    
  }}>
 {/* <Grid container spacing={2}>


   
<FormControl sx={{width:"30%"}} size="small">
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"

    label="Age"
   
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  
</FormControl >

    

  
   
   
    </Grid> */}
      <Grid container marginTop={4} spacing={1} >

      <Grid item md={12} >
        <Grid container spacing={1}>
          <Grid item md={6} sm={12} >
          <FormControl className="formc"  fullWidth>
  <InputLabel id="demo-simple-select-label" >Age</InputLabel >
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"

    label="Age"

    
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  
</FormControl >
          </Grid >
          <Grid item md={6} >
          <TextField onChange={handleInput} name="logotext" id="outlined-basic" label="Accordation body logo text" variant="outlined" fullWidth />
          </Grid >
          <Grid item md={6} >
        
          <LocalizationProvider dateAdapter={AdapterDayjs}  >
          <DatePicker  label="Basic date picker" sx={{width:"100%"}} 
        
          />
    </LocalizationProvider>
   
          </Grid >
          <Grid item md={6} lg={6} >
          <TextField onChange={handleInput} name="certlink" id="outlined-basic" label="Certificate hyperlink" variant="outlined" fullWidth />
          </Grid >
        </Grid>

      </Grid >


      <Grid item md={10} >
      <TextField onChange={handleInput} name="scopeHyperlink"   id="outlined-basic" label="Scope hyperlink" variant="outlined" fullWidth />
      <label class="switch">
      
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
      </Grid >

    </Grid>
      <div style={{marginLeft:"-10px"}} className="imagePreview">
      <div className="imageBox">
<img src={file} alt="" srcset="" />
      </div>
    </div>
    </Box>
    <Box  sx={{
    backgroundColor: '#fff',
    borderRadius: '4px',

    borderBottom:"1px solid black",
    borderRight:"1px solid black",
    padding: '20px',
    maxWidth: '100%',
    height: '15vh',
   
  }}>
      <div style={{display:"flex",justifyContent:"space-between",marginLeft:"85%"}} className="uploadSection">
      
      <Button onClick={handleUpload} disabled={btnValue} sx={{height:"40px"}} variant="contained">UPLOAD</Button>
     
      </div>
     
      <div style={{display:"flex",marginTop:"-40px",marginLeft:"50px",cursor:"pointer"}}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1092/1092220.png"
        alt=""
        height="80px"
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
    
        onChange={handleInput}
         name="file"
      
      />
      <div style={{marginLeft:"50px"}}>
        <h3>Select File</h3>
        <p style={{marginTop:"-10px"}}>Drop the browse through your machine</p>
      </div>
    </div>
    </Box>
    </>

  )
}
export default Upload;
