import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import cookie from 'cookie';
import { Link, useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // eslint-disable-next-line
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    // * Checking cookie object to see if cookies.loggedIn is truthy.
    // console.log(cookies.loggedIn);
    return cookies['loggedIn'] ? true : false;
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
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
            PM Cinch
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              {checkAuth() ? (
                <>
                  <Link to='/'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>Dashboard</Typography>
                    </MenuItem>
                  </Link>
                  <Link to='/newProject'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>New Project</Typography>
                    </MenuItem>
                  </Link>
                </>
              ) : null}
              <Link to='/newUser'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>New User</Typography>
                </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  document.cookie = cookie.serialize(
                    'loggedIn',
                    null,
                    {
                      maxAge: 0,
                    },
                    handleCloseNavMenu
                  );
                  navigate('/login');
                }}
              >
                <Typography textAlign='center'>
                  {checkAuth() ? 'Logout' : 'Login'}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
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
            PM Cinch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {checkAuth() ? (
              <>
                <Link to='/'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to='/newProject'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    New Project
                  </Button>
                </Link>
              </>
            ) : null}
            <Link to='/newUser'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                New User
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={() => {
                document.cookie = cookie.serialize('loggedIn', null, {
                  maxAge: 0,
                });
                navigate('/login');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {checkAuth() ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
