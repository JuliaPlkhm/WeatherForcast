import React, { FC, useState } from "react";
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
import {Switches} from '../Switch'
import {  setLogin } from "../../Redux/UserSlice";
import './Header.style.css'



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

export const PrimarySearchAppBar: FC =() =>{
  const {loggedIn} = useAppSelector(state => state.login);

    const  imageUrl = useAppSelector(state => state.login.user.imageUrl)
 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cityState, setCityState] = useState<string>('');
  const dispatch = useAppDispatch();
 
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit=()=>{
      dispatch(setLogin(false));
  }

  const handleClick=(event: React.KeyboardEvent<HTMLInputElement>)=>{
    
    if(event.key === 'Enter'){
      dispatch(setCity(cityState));
      setCityState('')
    }
  }
  const changeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityState(event.target.value);
  }
  
  return (
    <Box className="wrapper headerWrapper" >
      <AppBar className="wrapper__container header" position="static" >
        <Toolbar className="header__toolbar">

          <img className="header__logo" src={logo} alt="logo" />
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
          <div className ="header__icon header-icon">
            <Switches />
            {imageUrl && (
              <><Avatar className ="header-icon__avatar" alt="avatar" src={imageUrl} aria-controls="menu-appbar"
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
                {/* <MenuItem onClick={handleClose} >{name}</MenuItem>
                <MenuItem onClick={handleClose} >{email}</MenuItem> */}
                <MenuItem onClick={handleExit}>Выйти</MenuItem>

              </Menu> </>)
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}