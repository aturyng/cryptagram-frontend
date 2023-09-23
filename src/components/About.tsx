import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Grid, Link } from '@mui/material';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function About() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
  return (
    <>
      <Grid item className='form-item'>
        <Typography variant="h4">{t('about.header')}</Typography>
      </Grid>
      <Grid item className='form-item'>

          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{t('about.accordion.about.header')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>{t('about.accordion.about.body')}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{t('about.accordion.src-code.header')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ mb: 2 }}>
          {t('about.accordion.src-code.body.part1')}
            <Link href="http://www.apache.org/licenses/">Apache License Version 2.0</Link>.
            {t('about.accordion.src-code.body.part2')} 
            <ul>
              <li><Link href="https://github.com/aturyng/cryptagram-frontend">https://github.com/aturyng/cryptagram-frontend</Link></li>
              <li><Link href="https://github.com/aturyng/cryptagram-backend">https://github.com/aturyng/cryptagram-backend</Link></li>
            </ul>
      </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{t('about.accordion.tech-impl.header')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol>
              <li>{t('about.accordion.tech-impl.li1')}</li>
              <li>{t('about.accordion.tech-impl.li2')} </li>
              <li>{t('about.accordion.tech-impl.li3')} </li>
              <li>{t('about.accordion.tech-impl.li4')}</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
          
      </Grid>
    </>
  )
}

export default About