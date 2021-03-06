import { FC, useContext} from "react";
import { Context } from "../../../App";
import { PropsCard } from "../../../type";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { weatherTranslations } from "../weatherTranslations";
import {  Link } from 'react-router-dom';
import './WeatherCard.style.css'

export const WeatherCard: FC<PropsCard> = (props) => {
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
    <Card className = {`weatherCard weatherCard-${context.theme}`} >
    <CardActionArea className = "weatherCard__item" component={Link} to={`/${props.city}/${props.index}`}  sx={{ padding: 2, height: 1}}>
      <Typography className = "weatherCard__date"  variant="body2" color="text.secondary">
        {props.forecast?.date && date(props.forecast?.date)}
      </Typography>
      <img className = "weatherCard__img" 
        src={`https://yastatic.net/weather/i/icons/funky/dark/${props.forecast?.parts.day_short.icon}.svg`}
        alt="weather icon"
      ></img>
      <Typography className = "weatherCard__temp" gutterBottom variant="h5" component="div">
        {props.forecast?.parts.day_short.temp}
      </Typography>
      <Typography className = "weatherCard__condition"  variant="body2" color="text.secondary">
        {props.forecast && weatherTranslations[String(props.forecast?.parts.day_short.condition)]}
      </Typography>
    </CardActionArea>
    </Card>

  );
};
