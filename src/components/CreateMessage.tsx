import { Typography } from '@mui/material'
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
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        New Encrypted Message
      </Typography>
      <MessageForm onMessageCreated={howUrl} encryptionService={new EncryptionService} />

    </>
  )
}

export default CreateMessage