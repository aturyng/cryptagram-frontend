import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MailLockIcon from '@mui/icons-material/MailLock';
import { NavLink, Outlet } from 'react-router-dom';
import { Container, Grid, Paper, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';



export const NavbarLink = styled(NavLink)`
color: white;
text-decoration: none;
padding: 5px;
&:hover,
&:focus{
   color: black;
};
`

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { t } = useTranslation();

  const links = [[t('app-nav-bar.create-message.label'), ''], [t('app-nav-bar.about.label'), 'about']]
  
  return (
    <>
      <AppBar position="static" color="primary">
        <Container >
          <Toolbar disableGutters>
            <MailLockIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CryptaGram
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {links.map((page) => (
                  <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink to={page[1]}>{page[0]}</NavLink>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <MailLockIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CryptaGram
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
              {links.map((page) => (
                <Button
                  key={page[0]}
                  onClick={handleCloseNavMenu}

                  sx={{
                    my: 2,
                    mx: 1,
                    borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    fontSize: '1.1rem',
                    color: 'white', // Set the color to white
                  }}
                  component={NavbarLink}
                  to={page[1]}
                >
                  <NavbarLink to={page[1]}

                  >{page[0]}</NavbarLink>
                </Button>
              ))}
            </Box>


          </Toolbar>
        </Container>
      </AppBar>

      <Grid container component="main" sx={{
        height: '91.3vh',
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%'
      }}>
        <Grid item justifyContent="flex-start" sm={12} md={8} lg={7} xl={6}>
          <Container component="main" sx={{ mb: 4 }} >
            <Paper elevation={10} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Outlet />
            </Paper>
          </Container>

        </Grid>
      </Grid>
    </>
  );
}
export default ResponsiveAppBar;