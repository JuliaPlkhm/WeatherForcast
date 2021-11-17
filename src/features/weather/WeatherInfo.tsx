import { FC} from "react";
import { PropsInfo } from "./type";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { weatherTranslations } from "./weatherTranslations";
import Grid from '@mui/material/Grid';
import { HourWeather } from "./HourWeather";
import Stack from '@mui/material/Stack';
import { SliderMain } from  "./Slider"

export const WeatherInfo: FC<PropsInfo> = (props) => {

  let date = (d: string) => {
    return new Date(d).toLocaleString('ru',
      {
        day: 'numeric',
        month: 'long',
      }
    )
  };
  // let formatter = new Intl.DateTimeFormat("ru", {
  //   hour: "numeric",
  //   minute: "numeric",
  // });
  return (

    <Card sx={{ maxWidth: 1200, width: 1,  padding: 2, marginLeft: 2, mb: 3, mx: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.3)' , boxSizing: 'border-box' }}>
      <Typography variant="h6" >
        {props.geo?.locality?.name || "Нет данных"}
      </Typography>
      <Typography variant="h6" >
        {date(props.forecast?.date as string) || "Нет данных"}
      </Typography>
      <img style={{ height: "90px" }}
        src={`https://yastatic.net/weather/i/icons/funky/dark/${props.forecast?.parts.day_short.icon}.svg`}
        alt="weather icon"
      ></img>
      <Typography gutterBottom variant="h4" component="div">
        {props.forecast?.parts.day_short.temp || "Нет данных"}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {`Ощущается как ${props.forecast?.parts.day_short.feels_like}` || "Нет данных"}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{
        '&::after': {
          content: '""',
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
          display: 'block',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.6)',
          my: 2
        }
      }}>
        {props.forecast && weatherTranslations[String(props.forecast?.parts.day_short.condition)] || "Нет данных"}
      </Typography>
   
      
      <SliderMain>
          {props.forecast?.hours.map((el) => <HourWeather hour={el.hour} icon={el.icon} temp={el.temp} />)}
      </SliderMain>
     
      
      
    </Card>
  );
};
