import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MessageForm from './MessageForm'
import { useNavigate } from 'react-router-dom';
import EncryptionService from '../services/EncryptionService';
import { useTranslation } from 'react-i18next';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function CreateMessage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const howUrl = function (messageId: string, generateRandomPassword: string) {
    console.log(messageId);
    navigate('/messages/created', { replace: false, state: { messageId: messageId, password: generateRandomPassword } })
  }
  return (
    <>
      <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2}}>
      <Grid item >
        <Typography variant="h4" align="center" >
          {t('create-message.header.label')}
        </Typography>
      </Grid>
      <Grid item sx={{ ml: 1}}>
      <Tooltip title={t('create-message.header.tooltip')}>
      <IconButton>
        <HelpOutlineIcon/>
      </IconButton>
    </Tooltip>
      
      </Grid>
    </Grid>
      
      
      <MessageForm onMessageCreated={howUrl} encryptionService={new EncryptionService} />

    </>
  )
}

export default CreateMessage