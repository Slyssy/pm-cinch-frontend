import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'cookie';
import { AppBar, Toolbar, Typography } from '@mui/material';

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  // * Checking cookie object to see if cookies.loggedIn is truthy.
  // console.log(cookies.loggedIn);
  return cookies['loggedIn'] ? true : false;
};

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <AppBar position='relative' color='primary'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: '1', color: 'white' }}>
          PM Cinch
        </Typography>
        <ul className='nav-list'>
          <li className='nav-list-item'>
            <Link to='/'>
              <Typography style={{ color: 'white' }}>Dashboard</Typography>
            </Link>
          </li>
          <li className='nav-list-item'>
            <Link to='/newUser'>
              <Typography style={{ color: 'white' }}>New User</Typography>
            </Link>
          </li>
          <li className='nav-list-item'>
            <Link to='/newProject'>
              <Typography style={{ color: 'white' }}>New Project</Typography>
            </Link>
          </li>
          <li
            className='nav-list-item'
            onClick={() => {
              document.cookie = cookie.serialize('loggedIn', null, {
                maxAge: 0,
              });
              navigate('/login');
            }}
          >
            <Typography style={{ color: 'white' }}>
              {checkAuth() ? 'Logout' : 'Login'}
            </Typography>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
