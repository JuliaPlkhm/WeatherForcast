import React, { useEffect, FC, useState, useContext } from "react";
import { Context } from "../../App";
import { useParams } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { useGetWeatherByQueryQuery } from "../../api/weatherAPI";
import { Fact, Geo, Forecast, ForecastParts, QuizParams } from "../../features/weather/type";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { setCoords, setCity } from "../../Redux/weatherSlice";
import { WeatherCard } from "../../features/weather/WeatherCard";
import { WeatherInfo } from "../../features/weather/WeatherInfo";
import { Input } from "@mui/material";
import YandexMapComponent from "../../features/weather/map";
import PrimarySearchAppBar from "../../features/weather/Header"
import Footer from "../../features/weather/Footer"
import './Weather.css'
import background from './../../assets/sky.jpg'
import {CoordsSearch} from "../../features/weather/CoordsSearch/CoordsSearch"
import {CityGrid} from "../../features/weather/CityGrid/CityGrid"
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const Weather: FC = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const coords = useAppSelector(state => state.map.coords);
  const city = useAppSelector(state => state.map.city);
  const [open, setOpen] = useState(false);
  const { data, error, isError, isLoading, isSuccess } =
    useGetWeatherByQueryQuery({
      lat: Number(coords[0]),
      lon: Number(coords[1]),
    });

  useEffect(() => {
    setOpen(false);
  }, [isSuccess, data]);

 useEffect(() => {
    if (isError && error) {
      setOpen(true)
    }
  }, [isError, error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    };
    setOpen(false);
  };

 
  return (
    <div >
      <PrimarySearchAppBar />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Ошибка сервера
        </Alert>
      </Snackbar>

      {isLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
        
          <div className={`wrapper weatherWrapper weather-${context.theme}`}>
            <div className={"container weathercontainer" }>
              <WeatherInfo forecast={data?.forecasts[Number(id) || 0]} geo={data?.geo_object} fact={data?.fact} />

              <div className="weatherCards">
                {data?.forecasts.map((el: ForecastParts, index: number) => (
                  <WeatherCard forecast={el} city={city} geo={data?.geo_object} key={index} index={index} />
                ))}
              </div>
            </div>
          </div>
        )
      }
      <div className={` wrapper mapWrapper map-${context.theme}`}>
        <CoordsSearch />
        <YandexMapComponent city={city} />
        <CityGrid/>
     </div>
     <Footer />
    </div>
  );
};