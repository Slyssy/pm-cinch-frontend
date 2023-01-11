import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  // ThemeProvider,
  // createTheme,
} from '@mui/material';

const Login = (props) => {
  // console.log(props);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTextChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  // console.log(user);
  const login = (e) => {
    // e.preventDefault();
    // // # Send POST request to server for user.
    // // const payload = { ...user };
    // // props.userLogin(payload);
    // axios
    //   .post('https://pm-cinch-backend.vercel.app/signin', {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     //? Setting token using props from app.js
    //     console.log(response.data.token);
    //     props.setToken(response.data.token);
    //     // # If successful...
    //     //? set cookie here
    //     //? set loggedIn = true and max-age = 60*1000 (one minute)
    //     document.cookie = 'loggedIn=true;max-age=60*1000';
    //     navigate('/');
    //   });
    document.cookie = 'loggedIn=true;max-age=60*1000';
    navigate('/');
  };

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: '#3BB371',
  //     },
  //     secondary: {
  //       main: '#E0E0E0',
  //     },
  //   },
  // });

  return (
    <div className='App'>
      <Container maxWidth='sm'>
        <form className='login-form' onSubmit={login}>
          <TextField
            required
            onChange={handleTextChange}
            value={user.email}
            name='email'
            label='Email'
            type='text'
            variant='standard'
          />
          <TextField
            required
            onChange={handleTextChange}
            value={user.password}
            name='password'
            label='Password'
            type='password'
            variant='standard'
          />
          {/* <ThemeProvider theme={theme}> */}
          <Button
            onClick={login}
            type='submit'
            className='login-button'
            variant='contained'
            color='secondary'
          >
            Login
          </Button>
          {/* </ThemeProvider> */}
        </form>
      </Container>
    </div>
  );
};

export default Login;
