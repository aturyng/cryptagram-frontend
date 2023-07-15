import { useLocation } from "react-router-dom";
import Utils from "../util/Utils";
import { Alert, Box, Grid } from '@mui/material'
import CopyableField from "./CopyableField";



function MessageCreated() {
  const location = useLocation();
  let url = `http://localhost:5173/messages/${location.state.messageId}`
  if(location.state.password){
    url = url + `?${Utils.URL_PARAM_PASSWORD}=${Utils.toUrlSafeBase64(location.state.password)}`
  }
  return (
    <>
      <Grid item className='form-item'>
        
          <Alert severity="success" sx={{ mb: 3 }}>

            Message successfully created! <strong>Copy the link below...</strong>
          </Alert>
          <Box>
            <CopyableField color="success" focused fullWidth label="URL" id="url" size="medium" multiline defaultValue={url} />
          </Box>
        

      </Grid>

    </>
  )
}

export default MessageCreated