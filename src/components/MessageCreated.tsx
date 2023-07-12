import { useLocation } from "react-router-dom";
import Utils from "../util/Utils";
import { Box, Grid } from '@mui/material'
import CopyableField from "./CopyableField";


function MessageCreated() {
  const location = useLocation();
  const url = `http://localhost:5173/messages/${location.state.messageId}?pw=${Utils.toUrlSafeBase64(location.state.password)}`
  
  const onCopy = () => {
    
    
  }
  return (
    <>
      <Grid item className='form-item'>
        <h2>
          Message successfully created! Copy the link below:
        </h2>
        <Box>
          <CopyableField color="success" focused fullWidth label="URL" id="url" size="medium" multiline defaultValue={url} onCopy={onCopy} />
        </Box>
      </Grid>

    </>
  )
}

export default MessageCreated