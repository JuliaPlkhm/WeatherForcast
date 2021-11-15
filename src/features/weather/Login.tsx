
import { GoogleLogin } from 'react-google-login'
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import {  setLogin, setUser } from "../../Redux/UserSlice";

export function Login() {
    const loggedIn = useAppSelector(state => state.login.loggedIn);

    const dispatch = useAppDispatch();
    const responseGoogle = (response: any) => {
        console.log(response);
        dispatch(setLogin(true))
        dispatch(setUser(response.profileObj))

        console.log(loggedIn);
    }

    return (

<GoogleLogin
    clientId="1079041619450-pnqvc7n9mgv9adlh7t76e7rc7d97lo4d.apps.googleusercontent.com"
    render={renderProps => (
        <Button variant="outlined" onClick={renderProps.onClick} disabled={renderProps.disabled} sx ={{
            backgroundColor: 'rgb(255, 255, 255, 0.15)',
            color: 'white',
  '&:hover': {
    backgroundColor: 'rgb(255, 255, 255, 0.25)',
  },
        } }>Авторизация</Button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    );
}