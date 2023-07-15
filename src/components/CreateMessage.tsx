import { Grid, Typography } from '@mui/material'
import MessageForm from './MessageForm'
import { useNavigate } from 'react-router-dom';
import EncryptionService from '../services/EncryptionService';

function CreateMessage() {
  const navigate = useNavigate();
  const howUrl = function (messageId: string, generateRandomPassword: string) {
    console.log(messageId);
    navigate('/messages/created', { replace: false, state: { messageId: messageId, password: generateRandomPassword } })
  }
  return (
    <>
      <Grid item className='form-item'>
        <Typography variant="h4">
          New Encrypted Message
        </Typography>
      </Grid>
      <Grid item className='form-item'>
        <MessageForm onMessageCreated={howUrl} encryptionService={new EncryptionService} />
      </Grid>
    </>
  )
}

export default CreateMessage