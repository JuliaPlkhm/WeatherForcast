import React, { useEffect, FC, useState, useContext } from "react";
import { Context } from "../../../App";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { setCity } from "../../../Redux/weatherSlice";

import './CityGrid.style.css'

const cities = ['Амстердам', 'Андорра-ла-Велья', 'Афины', 'Белград', 'Берлин', 'Берн', 'Братислава', 'Брюссель', 'Будапешт', 'Бухарест', 'Вадуц', 'Варшава', 'Ватикан','Вена', 'Вильнюс', 'Дублин', 'Загреб', 'Киев','Кишинев', 'Копенгаген','Лиссабон','Лондон','Любляна','Люксембург','Мадрид','Монако', 'Москва', 'Осло', 'Париж', 'Подгорица','Прага','Рейкьявик'	,'Рига','Рим','Сан-Марино', 'Сараево','Скопье', 'София', 'Стокгольм', 'Таллинн','Тирана','Хельсинки']


export const CityGrid: FC = () => {
    const context = useContext(Context);
    const dispatch = useAppDispatch();

    const handleClick=(el:string)=>(event: React.MouseEvent<HTMLElement>)=>{
     
          dispatch(setCity(el));
          
        }
 
      
   
    return (

        <div className="cityGrid">
            {cities.map((el: string) => (
                <Link  className="cityGrid__item" to ={`/${el}/0`} onClick={handleClick(el)} >{el}</Link>
            ))}
        </div>

    );
};
