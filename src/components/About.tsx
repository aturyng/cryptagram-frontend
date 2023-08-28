import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  return (
    <>
      <Grid item className='form-item'>
        <Typography variant="h4">{t('about.header')}</Typography>
      </Grid>
      <Grid item className='form-item'>
        <Typography variant="h6">{t('about.body')}</Typography>
      </Grid>
    </>
  )
}

export default About