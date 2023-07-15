import { Button, FormControlLabel, Grid, List, ListItem, Switch, TextField } from '@mui/material'
import { Textarea } from '@mui/joy'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup';
import Typography from './onepirate-template/modules/components/Typography'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import EncryptionService from '../services/EncryptionService';
import HttpsIcon from '@mui/icons-material/Https';


type FormData = {
  destroyLive: boolean,
  destroyLiveAfterSeconds: number,
  body: string,
  password: string,
  confirmPassword: string,
  destroyAfterDays: number
};



interface Props {
  onMessageCreated: (arg0: string, arg1: string) => void,
  encryptionService: EncryptionService
}

export default function MessageForm(props: Props) {

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .required('Message is required')
      .max(5000, 'Message must not exceed 5000 characters'),
    destroyLive: Yup.bool(),
    destroyLiveAfterSeconds: Yup.number()
      .when('destroyLive', {
        is: true,
        then: (schema) => schema.required('Is required')
      })
      .min(0, 'Cannot be negative')
      .max(60, 'Cannot exceed 60 seconds'),
    password: Yup.string(),
    confirmPassword: Yup.string()
      .when('password', {
        is: (value: string) => value && value.length > 0,
        then: (schema) => schema.required('Confirm the password')
      })
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
    destroyAfterDays: Yup.number()
      .min(1, 'Cannot be negative or zero')
      .max(60, 'Cannot exceed 60 days')
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit: SubmitHandler<FormData> = (formData) => {
    let { ["confirmPassword"]: _, ["destroyLive"]: __, ...formDataRequiredFields } = formData;
    let randomStr = "";
    if (!formDataRequiredFields.password) {
      randomStr = props.encryptionService.generateRandomPassword();
      formDataRequiredFields.password = randomStr;
    }

    axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT}/api/messages/`, formDataRequiredFields).then((response) => {
      console.log("randomStr: ");
      console.log(randomStr);
      props.onMessageCreated(response.data.data, randomStr)
    });
  }


  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={3}  >
        <Grid item xs={12}>
          <Textarea
            minRows={5}
            placeholder="Enter message here..."
            size="lg"
            variant="outlined"
            {...register("body", { required: true })}
            error={errors.body ? true : false}
          />
          <Typography variant="inherit" color="red">
            {errors.body?.message}
          </Typography>
        </Grid>

        <Grid container item spacing={3} md={12} xl={6} >
          <Grid item xs={12} sm={6} xl={8} >

            <List disablePadding>
              <ListItem alignItems="flex-start" disablePadding>
                <FormControlLabel label="Close after" labelPlacement="end" control={
                  <Switch {...register("destroyLive")} />}
                />
                <TextField
                  type='number'
                  disabled={!watch('destroyLive')}
                  label="seconds"
                  variant='standard'
                  fullWidth
                  {...register("destroyLiveAfterSeconds")}
                  error={errors.destroyLiveAfterSeconds ? true : false}
                  helperText={errors.destroyLiveAfterSeconds?.message}
                />
              </ListItem>
            </List>

          </Grid>
          <Grid item xs={12} sm={6} xl={4}  >
            <TextField
              type='number'
              label="Destroy after days"
              variant='standard'
              defaultValue={1}
              fullWidth
              {...register("destroyAfterDays")}
              error={errors.destroyAfterDays ? true : false}
              helperText={errors.destroyAfterDays?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={3} md={12} xl={6} >
          <Grid item xs={12} sm={6} >
            <TextField
              type='password'
              label="Password (optionally)"
              variant='standard'
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              type='password'
              label="Confirm password"
              variant='standard'
              fullWidth
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <Button className="line" variant="contained" type='submit' endIcon={<HttpsIcon />}>Encrypt & Create</Button>
        </Grid>
      </Grid>



    </form>
  )
}
