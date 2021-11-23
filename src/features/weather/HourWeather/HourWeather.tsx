import { FC} from "react";
import { HoursType } from "../../../type";
import Typography from '@mui/material/Typography';
import './HourWeather.style.css'

export const HourWeather: FC<HoursType> = (props) => {

    return (

        <div className = "hourWeather" > 
            <Typography className = "hourWeather__temp" variant="body2" color="text.secondary">
                {props.temp}
            </Typography>
            <img className = "hourWeather__img" 
                src={`https://yastatic.net/weather/i/icons/funky/dark/${props.icon}.svg`}
                alt="weather icon"
            ></img>
            <Typography className = "hourWeather__hour" variant="body2" color="text.secondary">
                {props.hour + ':00'}
            </Typography>

        </div>
    );
};