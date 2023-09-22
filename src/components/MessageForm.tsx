import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, Grid, List, ListItem, Switch, TextField, Typography } from '@mui/material'
import { Textarea } from '@mui/joy'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import EncryptionService from '../services/EncryptionService';
import HttpsIcon from '@mui/icons-material/Https';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';


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
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .required(t('create-message.form.validation.is-required'))
      .max(5000, t('create-message.form.validation.message-not-longer-than')),
    destroyLive: Yup.bool(),
    destroyLiveAfterSeconds: Yup.number()
      .when('destroyLive', {
        is: true,
        then: (schema) => schema.required(t('create-message.form.validation.is-required'))
      })
      .min(0, t('create-message.form.validation.cannot-negative'))
      .max(60, t('create-message.form.validation.cannot-exceed-sec')),
    password: Yup.string(),
    confirmPassword: Yup.string()
      .when('password', {
        is: (value: string) => value && value.length > 0,
        then: (schema) => schema.required(t('create-message.form.validation.confirm-pass'))
      })
      .oneOf([Yup.ref('password')], t('create-message.form.validation.pass-mismatch')),
    destroyAfterDays: Yup.number()
      .min(1, t('create-message.form.validation.must-gt-zero'))
      .max(60, t('create-message.form.validation.cannot-exceed-days'))
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
    const { ["confirmPassword"]: _, ["destroyLive"]: __, ...formDataRequiredFields } = formData;
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


  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={3}  >
        <Grid item xs={12}>
          <Textarea
            minRows={5}
            placeholder={t('create-message.form.main-body.placeholder')}
            size="lg"
            variant="outlined"
            {...register("body", { required: true })}
            error={errors.body ? true : false}
          />
          <Typography variant="inherit" color="red">
            {errors.body?.message}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {t('create-message.form.additional-settings-accordion.label')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item spacing={3} md={12} xl={6} >

                <Grid item xs={12} sm={6} xl={8} >

                  <List disablePadding>
                    <ListItem alignItems="flex-start" disablePadding>
                      <FormControlLabel label={t('create-message.form.close-after.label')} labelPlacement="end" control={
                        <Switch {...register("destroyLive")} />}
                      />
                      <TextField
                        type='number'
                        disabled={!watch('destroyLive')}
                        label={t('create-message.form.seconds.label')}
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
                    label={t('create-message.form.destroy-after.label')}
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
                    label={t('create-message.form.password.label')}
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
                    label={t('create-message.form.confirm-password.label')}
                    variant='standard'
                    fullWidth
                    {...register("confirmPassword")}
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>

              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Button className="line" variant="contained" type='submit' endIcon={<HttpsIcon />}>{t('create-message.form.btn_confirm.label')}</Button>
        </Grid>
      </Grid>

    </form>
  )
}
