import { FC} from "react";
import Typography from '@mui/material/Typography';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './arrow.css'


import Slider from 'react-slick'



  

export const SliderMain: FC = ({children}) => {
   
    const defaultSettings = {
      dots: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 7,
      arrows: true,
      infinite: ( children as [])?.length > 3 ,
      AdaptiveHeight: true,
      swipeToSlide: true,
    }
  
    return (
        <Slider {...defaultSettings} >
            {((children as [])?.length == 0 )? ( 
             
               <Typography variant="body2" color="text.secondary" > Нет данных
            </Typography>
             ): (children
            )}
           
        </Slider>

    )
  }