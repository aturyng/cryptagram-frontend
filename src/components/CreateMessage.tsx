import { Container, Paper, Typography } from '@mui/material'
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
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            New Encrypted Message
          </Typography>
          <MessageForm onMessageCreated={howUrl} encryptionService={new EncryptionService} />
        </Paper>
      </Container>
    </>
  )
}

export default CreateMessage