
import {FormControlLabel, Checkbox, TextField, FormGroup, FormControl, FormHelperText, List, ListItem, Button, Stack} from '@mui/material'
import './AppCheckbox.css'
import React from 'react';


function AppCheckBox() {
  const [destroyLive, setDestroyLive] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestroyLive(event.target.checked);
  }


  return (
    <Stack spacing={1} direction="row">
            <FormControlLabel
              label="Destroy after "
              control={<Checkbox checked={destroyLive} onChange={handleChange}/>}
             />
            <TextField
         
              required={true}
              id='destry-timer'
              type='number'
              disabled={!destroyLive}
              label="seconds of viewing"
              variant='standard'
            />
      </Stack>
  )
}

export default AppCheckBox