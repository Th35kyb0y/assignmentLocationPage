
import './App.css';

import Download from './components/downloadDelete';
import Upload from './components/upload';
import Save from './components/save';
import Box from '@mui/material/Box';
import {styled} from '@emotion/styled';
import { Button } from '@mui/material';
function App() {

  return (
    <Box
  sx={{
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    border:"1px solid black",
    padding: '0',
    margin:"0",
    width: '75%',
    height: 'max-content',
    display: 'flex',
    flexDirection:"column",
 
    marginLeft:"8%",
    marginTop:"2%"
  }}
>
<Upload />
<Download />
<Save />
</Box>

    
  );
}

export default App;
