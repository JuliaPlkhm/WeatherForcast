import React, { useEffect, FC, useState } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { useGetWeatherByQueryQuery } from "../../../api/weatherAPI";
import { Fact, Geo, Forecast, ForecastParts, QuizParams } from "../type";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { setCoords, setCity } from "../../../Redux/weatherSlice";
import { WeatherCard } from "../WeatherCard";
import { WeatherInfo } from "../WeatherInfo";
import { Input } from "@mui/material";
import YandexMapComponent from "../map";
import PrimarySearchAppBar from "../Header"
import Footer from "../Footer"
import background from './sky.jpg'

import { SliderMain } from  "../Slider"
import { url } from "inspector";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface Props {
 
}

export interface mapApi {
  geocode: ((params:string | undefined ) => Promise<void>) | undefined;
}

export const Weather: FC<Props> = (props) => {
  const { id } = useParams<QuizParams>()
  const coords = useAppSelector(state => state.map.coords);

  const city = useAppSelector(state => state.map.city);
  const dispatch = useAppDispatch();
  const [cityState, setCityState] = useState<string>('Minsk');

  const [geo, setGeo] = useState<Geo>();
  const [forecast, setForecast] = useState<Forecast>();

  const [factState, setFact] = useState<Fact>();
  const [open, setOpen] = useState(false);
  const { data, error, isError, isLoading, isSuccess } =
    useGetWeatherByQueryQuery({
      lat: Number(coords[0]),
      lon: Number(coords[1]),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setGeo(data.geo_object);
      setForecast(data.forecasts);
      setFact(data.fact);
      setOpen(false);
      console.log(forecast)
    }
  }, [isSuccess, data]);

  useEffect(() => {
      if(isError && error){
        setOpen(true)
        console.error(error)
      }
  }, [isError, error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    };

    setOpen(false);
  };
  const handleClick=()=>{
    dispatch(setCity(cityState));
  }

  const changeCoords =
    (direction: "lat" | "lon") => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (direction === "lat") {
        dispatch(setCoords([Number(e.target.value), coords[1]]));
      }
      if (direction === "lon") {
        dispatch(setCoords([coords[0], Number(e.target.value)]));
        // setState([coords[0], Number(e.target.value)]);

      }
    };
  const changeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityState(e.target.value);
  }

  let date = (d:string)=>{
  return new Date(d).toLocaleString('ru',
  {
    day: 'numeric',
    month: 'long',
  }
)};

 
  return (
    <div >
      <PrimarySearchAppBar />
    {/* <div style={{maxWidth: '1200px', width: '100%', margin: '0 auto', }}> */}
    
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error && ((error as FetchBaseQueryError)?.data as string)}
        </Alert>
      </Snackbar>
      {isLoading  ? (
        <CircularProgress></CircularProgress>
      ) : (<>
      <div style={{padding: "30px"}}>
        {forecast &&  <WeatherInfo forecast={forecast[Number(id)||0]} geo={geo} fact= {factState}/>}
        
        <div style ={{maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: "space-between"}}>
       {forecast && forecast.map((el: ForecastParts, index:number)=> (
       <WeatherCard forecast={el} geo={geo} fact= {factState} key={index} index={index}/>
      ))}
       </div> </div></>)
      }
      <Box>
       Поиск по координатам:
      </Box>
      <Box>
        Lat: <Input name="lat" value={coords[0]} onChange={changeCoords("lat")}></Input>
        Lon: <Input name="lon" value={coords[1]} onChange={changeCoords("lon")}></Input>
      </Box>
      <YandexMapComponent city={city} />
      <Footer/>
    {/* </div> */}
    </div>
  );
};
