import { FC} from "react";
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import './arrow.css'
import { PropsSlider } from "../../type";


export const SliderMain: FC<PropsSlider> = ({children}) => {
   
    const defaultSettings = {
      dots: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 7,
      arrows: true,
      infinite: children && (children.length  > 3)  ,
      AdaptiveHeight: true,
      swipeToSlide: true,
      responsive: [
        {
        breakpoint: 500,
        settings: {
        slidesToShow: 4,
        slidesToScroll: 3
        }},
        {
          breakpoint: 800,
          settings: {
          slidesToShow: 6,
          slidesToScroll: 5
          }}]
    }
  
    return (
        <Slider {...defaultSettings} >
            {(children?.length === 0 )? ( 
             
             <Typography variant="body2" color="text.secondary" > Нет данных
             </Typography>
             ): (children
            )}
           
        </Slider>

    )
  }