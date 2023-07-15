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
import { Container, Grid, styled } from '@mui/material';

const links = [['Create Message', ''], ['About', 'about']]

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


  return (
    <>

      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
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


      <Container className="main-container" maxWidth="xl">
        <Grid container >
          <Outlet />
        </Grid>
      </Container>
    </>
  );
}
export default ResponsiveAppBar;