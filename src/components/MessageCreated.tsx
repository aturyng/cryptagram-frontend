import { useLocation } from "react-router-dom";
import Utils from "../util/Utils";
import { Box, Grid, Typography } from '@mui/material'
import CopyableField from "./CopyableField";



function MessageCreated() {
  const location = useLocation();
  let url = `http://localhost:5173/messages/${location.state.messageId}`
  if (location.state.password) {
    url = url + `?${Utils.URL_PARAM_PASSWORD}=${Utils.toUrlSafeBase64(location.state.password)}`
  }
  return (
    <>
      <Grid item >
        <Typography variant="h5"  sx={{ mb: 3 }}>
          Message successfully created! Copy the link below...
        </Typography>

        <Box>
          <CopyableField color="success" focused fullWidth label="URL" id="url" size="medium" multiline defaultValue={url} />
        </Box>


      </Grid>

    </>
  )
}

export default MessageCreated