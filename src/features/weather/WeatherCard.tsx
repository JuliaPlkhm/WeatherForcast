import { FC} from "react";
import { PropsCard } from "./type";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { weatherTranslations } from "./weatherTranslations";
import { useParams, Link } from 'react-router-dom';

export const WeatherCard: FC<PropsCard> = (props) => {
  let date = (d: string) => {
    return new Date(d).toLocaleString('ru',
      {
        day: 'numeric',
        month: 'long',
      }
    )
  };

  let formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card sx={{ maxWidth: 140, width: 1, height: 180, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <CardActionArea  component={Link} to={`/${props.city}/${props.index}`}  sx={{ padding: 2, height: 1}}>

   
      <Typography variant="body2" color="text.secondary">
        {date(props.forecast?.date as string)}
      </Typography>
      <img style={{ height: "48px" }}
        src={`https://yastatic.net/weather/i/icons/funky/dark/${props.forecast?.parts.day_short.icon}.svg`}
        alt="weather icon"
      ></img>
      <Typography gutterBottom variant="h5" component="div">
        {props.forecast?.parts.day_short.temp}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.forecast && weatherTranslations[String(props.forecast?.parts.day_short.condition)]}
      </Typography>
    </CardActionArea>
    </Card>

  );
};
