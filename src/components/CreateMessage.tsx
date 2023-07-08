import { Container, Grid } from '@mui/material'
import Header from './Header'
import MessageForm from './MessageForm'
import { useNavigate } from 'react-router-dom';
import EncryptionService from '../services/EncryptionService';

function CreateMessage() {
  const navigate = useNavigate();
  const howUrl = function(messageId: string, generateRandomPassword: string){
    console.log(messageId);
    navigate('/messages/created', { replace: false, state: {messageId: messageId, password: generateRandomPassword} })
  }
  return (
    <>
     <Container className="main-container" maxWidth="xl">
        <Grid container >
            <Grid item className='form-item'>
            <Header/>
            </Grid>
            <Grid item className='form-item'>
            <MessageForm onMessageCreated = {howUrl} encryptionService={ new EncryptionService}/>
            </Grid>
        </Grid>
    </Container>
    </>
    )
}

export default CreateMessage