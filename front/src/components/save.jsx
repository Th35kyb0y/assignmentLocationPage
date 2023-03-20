import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { saveDoc } from "../actions/actions"
import { Box } from "@mui/system"
import { useState } from "react"
import Button from '@mui/material/Button';
const Save=()=>{
    const fileIDs=useSelector((state)=>state.add.ids)

const dispatch= useDispatch()
    const handleSave= async ()=>{
        // if there is no file upload , disable save button func
        if(fileIDs.length==0){
            alert("nothing to save , please first upload files")
        }
        else{
        const settings={
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(fileIDs)
        }
 const response = await fetch("http://localhost:5000/save",settings)
 const result=await response.text()
 alert(result)
 if(response.status==200){
    // on saving document clear all stored ids from redux store
dispatch(saveDoc())
 }
}
    }
return(
    <Box sx={{
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        border:"1px solid black",
        padding: '20px',
        maxWidth: '100%',
        height: '5vh',
        display: 'flex',
        float:"right",
        justifyContent:"space-between"
      }}>
<div></div>
<div style={{display:"flex"}}>
<Button onClick={handleSave}  sx={{height:"40px"}} variant="contained">SAVE</Button>
<button style={{marginLeft:"2%"}}>Close</button>
</div>
    </Box>
)
}
export default Save
