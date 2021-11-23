import { FC, useContext} from "react";
import { PropsInfo } from "../../../type";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { weatherTranslations } from "../weatherTranslations";
import { Context } from "../../../App";
import { HourWeather } from "../HourWeather/HourWeather";
import { SliderMain } from  "../../../components/Slider/Slider"
import './WeatherInfo.style.css'

export const WeatherInfo: FC<PropsInfo> = (props) => {
  const context = useContext(Context);
  let date = (d: string) => {
    return new Date(d).toLocaleString('ru',
      {
        day: 'numeric',
        month: 'long',
      }
    )
  };
 
  return (

    <Card className = {`weatherInfo weatherInfo-${context.theme}`} >
      <Typography className= "weatherInfo__text" variant="h6" >
        {props.geo?.locality?.name || "Нет данных"}
      </Typography>
      <Typography className= "weatherInfo__text" variant="h6" >
        {props.forecast?.date ? date(props.forecast?.date) : "Нет данных"}
      </Typography>
      <img className= "weatherInfo_img" style={{ height: "90px" }}
        src={`https://yastatic.net/weather/i/icons/funky/dark/${props.forecast?.parts.day_short.icon}.svg`}
        alt="weather icon"
      ></img>
      <Typography className = "weatherInfo__temp" gutterBottom variant="h4" component="div">
        {props.forecast?.parts.day_short.temp}
      </Typography>
      <Typography className = "weatherInfo__temp" variant="h6" color="text.secondary">
        {props.forecast?.parts.day_short.feels_like && (`Ощущается как ${props.forecast?.parts.day_short.feels_like}`)}
      </Typography>
      <Typography className = "weatherInfo__condition" variant="h6" color="text.secondary" >
        {(props.forecast && weatherTranslations[String(props.forecast?.parts.day_short.condition)] )}
      </Typography>
      <SliderMain>
          {props.forecast?.hours.map((el, index) => <HourWeather hour={el.hour} icon={el.icon} temp={el.temp} key ={index}/>)}
      </SliderMain>
      
    </Card>
  );
};
