import React, { useEffect, FC, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetWeatherByQueryQuery } from "./weatherAPI";
import { Fact, Geo } from "./type";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCoords, setCity } from "./weatherSlice";



import { Input } from "@mui/material";
import YandexMapComponent from "./map";

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
  // debugger
  const coords = useAppSelector(state => state.map.coords);

  const city = useAppSelector(state => state.map.city);
  const dispatch = useAppDispatch();
  // const query = useQuery()
  // const lat = query.get("lat");
  // const lon = query.get("lon");
  // const [state, setState] = useState<(number[] )>([53.902284,27.561831]);
  // const [city, setCity] = useState<string>('Minsk');

  const [geo, setGeo] = useState<Geo>();
  const [factState, setFact] = useState<Fact>();
  const [open, setOpen] = useState(false);
  const [loadMaps, setLoadMaps] = useState<any>();
  const [lon, setLon] = useState('51.104087');
  const { data, error, isError, isLoading, isSuccess } =
    useGetWeatherByQueryQuery({
      lat: Number(coords[0]),
      lon: Number(coords[1]),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setGeo(data.geo_object);
      setFact(data.fact);
      setOpen(false);
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
    
    dispatch(setCity(e.target.value));
    console.log(city)
    // onLoadMap(loadMaps)  
  }

  //  const onLoadMap = (ymaps: any) =>{
  //    console.log(ymaps)
    
  //     ymaps.geocode(city)?.then((result:any) => setState(result.geoObjects.get(0).geometry.getCoordinates()))
    
  // }
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error && ((error as FetchBaseQueryError)?.data as string)}
        </Alert>
      </Snackbar>
      {isLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <p>Country: {geo?.country?.name}</p>
          <p>Province: {geo?.province?.name}</p>
          <p>Temp: {factState?.temp}</p>
          <p>
            <img
              src={`https://yastatic.net/weather/i/icons/funky/dark/${factState?.icon}.svg`}
              alt="weather icon"
            ></img>
          </p>
        </Box>
      )}
      <Box>
        <Input name="lat" value={coords[0]} onChange={changeCoords("lat")}></Input>
        <Input name="lon" value={coords[1]} onChange={changeCoords("lon")}></Input>
      </Box>
      <Input name="country" value={city} onChange={changeCity}></Input>

 
      <YandexMapComponent city={city} />
        
     
    </div>
  );
};
