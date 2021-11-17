import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from 'react-google-login'
import {  useAppDispatch } from '../../Redux/hooks';
import {  setLogin, setUser } from "../../Redux/UserSlice";


export  function Login() {
    const dispatch = useAppDispatch();
    const responseGoogle = (response: any) => {
        dispatch(setLogin(true))
        dispatch(setUser(response.profileObj))
    }
  return (
      <Box
          sx={{
              display: 'flex',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              
          }}
      >

          <Paper elevation={3} sx={{
              padding: '10px',
              height: '400px',
              width: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',

          }}>
              <Typography variant="h4"sx={{
              textAlign: 'center' }} >
                 Пожалуйста, авторизуйтесь!
              </Typography>
              <GoogleLogin
                  clientId="1079041619450-pnqvc7n9mgv9adlh7t76e7rc7d97lo4d.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
              />
          </Paper>

      </Box>
  );
}