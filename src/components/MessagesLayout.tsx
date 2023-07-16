import { Container, Grid } from '@mui/material'
import { Outlet } from "react-router-dom";

function MessagesLayout() {
  return (
    <>
        <Container className="main-container" maxWidth="xl">
            <Grid container >
                <Outlet/>
            </Grid>
        </Container>
    </>
  )
}

export default MessagesLayout