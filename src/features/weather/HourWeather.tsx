import { FC} from "react";
import { HoursType } from "./type";
import Typography from '@mui/material/Typography';

export const HourWeather: FC<HoursType> = (props) => {


    return (

        <div style={{display: 'flex', flexDirection: 'column'}}> 
            <Typography variant="body2" color="text.secondary">
                {props.temp}
            </Typography>
            <img style={{ height: "40px" }}
                src={`https://yastatic.net/weather/i/icons/funky/dark/${props.icon}.svg`}
                alt="weather icon"
            ></img>
            <Typography variant="body2" color="text.secondary">
                {props.hour + ':00'}
            </Typography>

        </div>
    );
};