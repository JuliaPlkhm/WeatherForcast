import React, { FC, useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Context } from "../../../App";
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { setCoords } from "../../../Redux/weatherSlice";
import './CoordsSearch.style.css'


export const CoordsSearch: FC = () => {
  const context = useContext(Context);
  const coords = useAppSelector(state => state.map.coords);
  const dispatch = useAppDispatch();
  const [coordsState, setCoordsState] = useState<number[]>(coords);
 
  const changeCoords =
    (direction: "lat" | "lon") => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (direction === "lat") {
        setCoordsState([Number(e.target.value), coords[1]]);
      }
      if (direction === "lon") {
        setCoordsState([coords[0], Number(e.target.value)]);
      }
    };

  const handleClick = () =>  {
    dispatch(setCoords(coordsState));
    
  }
     
  useEffect(() => {
    setCoordsState(coords);
  }, [coords]);

  return (
    <div className ='container-weatherCard' >
      <Typography className ={`weatherCard__text-${context.theme}`} variant="h5">
      Поиск по координатам:
      </Typography>
     
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      color:'#fff'}}
      noValidate
      autoComplete="off"
    >
        <TextField
          className ={`weatherCard__input-${context.theme}`}
          label="Широта"
          id="outlined-size-small"
          size="small"
          value={coordsState[0]} onChange={changeCoords("lat")}
        />
        <TextField
          className ={`weatherCard__input-${context.theme}`}
          label="Долгота"
          id="outlined-size-small"
          size="small"
          value={coordsState[1]} onChange={changeCoords("lon")}
        />
      </Box>
      <Button variant="outlined" onClick={handleClick}>Найти</Button>
    </div>
  );
};
