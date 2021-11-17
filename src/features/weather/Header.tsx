import React, {  useState, useContext } from "react";
import { Context } from "../../App";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { setCity } from "../../Redux/weatherSlice";
import logo from './../../assets/logo.png'
import { Login } from './Login'
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const loggedIn = useAppSelector(state => state.login.loggedIn);
  const {name, imageUrl, email} = useAppSelector(state => state.login.user);
  const context = useContext(Context);
 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cityState, setCityState] = useState<string>('');
  const city = useAppSelector(state => state.map.city);
  const dispatch = useAppDispatch();
 
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTheme =()=>{
    {context.toggleTheme && context.toggleTheme()}
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick=(event: React.KeyboardEvent<HTMLInputElement>)=>{
    if(event.key === 'Enter'){
      dispatch(setCity(cityState));
      setCityState('')
    }
    console.log(Context)
  }
  const changeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityState(event.target.value);
  }
  

  return (
    <Box sx={{backgroundColor: '#1976d2'}} >
      <AppBar position="static" sx={{ flexGrow: 1, maxWidth: 1200, width: 1, mx: 'auto',  boxShadow: 'none' }}>
        <Toolbar>
          
          <img src={logo} style={{height: "40px"}}/>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Найти город"
              inputProps={{ 'aria-label': 'search' }}
              value={cityState} onChange={changeCity}
              onKeyPress={handleClick}
            />

          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Switch {...label} onClick={handleTheme}/>
            {loggedIn ? (imageUrl && (
            <><Avatar alt="Remy Sharp" src={imageUrl} aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{name}</MenuItem>
                <MenuItem onClick={handleClose}>{email}</MenuItem>
              </Menu> </>)
            ) : (<Login/>)
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}