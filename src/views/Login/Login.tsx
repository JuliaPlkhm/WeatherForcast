import React, {FC } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import {  useAppDispatch } from '../../Redux/hooks';
import {  setLogin, setUser } from "../../Redux/UserSlice";
import "./Login.style.css"



export  const Login: FC = () => {
    const dispatch = useAppDispatch();
    const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('profileObj' in response ){   
        dispatch(setLogin(true))
        dispatch(setUser(response.profileObj))
      }
    }
  return (
      <Box
          sx={{
              display: 'flex',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              position: 'relative',
              overflow:'hidden',
          }}
      >
      <img className="login__img login__img-1"
        src={`https://yastatic.net/weather/i/icons/funky/dark/ovc_-ra.svg`}
        alt="weather icon"
      ></img>
      <img className="login__img login__img-2"
        src={`https://yastatic.net/weather/i/icons/funky/dark/ovc_+sn.svg`}
        alt="weather icon"
      ></img>
      <img className="login__img login__img-3"
        src={`https://yastatic.net/weather/i/icons/funky/dark/ovc.svg`}
        alt="weather icon"
      ></img> <img className="login__img login__img-4"
        src={`https://yastatic.net/weather/i/icons/funky/dark/skc_d.svg`}
        alt="weather icon"
      ></img> <img className=" login__img login__img-5"
        src={`https://yastatic.net/weather/i/icons/funky/dark/bkn_d.svg`}
        alt="weather icon"
      ></img>
          <Paper className="login__form" elevation={3} >
              <Typography className="login__text" variant="h4"sx={{
              textAlign: 'center' }} >
                 Пожалуйста, авторизуйтесь!
              </Typography>
              <GoogleLogin
                  clientId="1079041619450-pnqvc7n9mgv9adlh7t76e7rc7d97lo4d.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  cookiePolicy={'single_host_origin'}
              />
          </Paper>

      </Box>
  );
}