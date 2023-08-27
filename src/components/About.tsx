import { Grid, Typography } from '@mui/material'

function About() {
  return (
    <>
      <Grid item className='form-item'>
        <Typography variant="h4">About</Typography>
      </Grid>
      <Grid item className='form-item'>
        <Typography variant="h6">This free-of-charge service allows you to securely send an encrypted message, 
        which self-destructs after it's been read. Also we offer a unique feature to set a time period to view the message. 
        When the time runs out, the message is removed in real time from the screen. </Typography>
      </Grid>
    </>
  )
}

export default About