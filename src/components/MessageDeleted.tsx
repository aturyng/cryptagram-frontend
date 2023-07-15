import { Alert, AlertTitle } from '@mui/material'

function MessageDeleted() {
  return (
    <Alert  severity="warning">
      <AlertTitle>Not Found</AlertTitle>
      Message has been deleted, never existed or the password is wrong!
    </Alert>

  )
}

export default MessageDeleted