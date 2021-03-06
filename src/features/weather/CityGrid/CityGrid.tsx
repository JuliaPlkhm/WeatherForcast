import React, {  FC,  useContext } from "react";
import { Context } from "../../../App";
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../Redux/hooks';
import { setCity } from "../../../Redux/weatherSlice";

import './CityGrid.style.css'

const cities = ['Амстердам', 'Андорра-ла-Велья', 'Афины', 'Белград', 'Берлин', 'Берн', 'Братислава', 'Брюссель', 'Будапешт', 'Бухарест', 'Вадуц', 'Варшава', 'Ватикан','Вена', 'Вильнюс', 'Дублин', 'Загреб', 'Киев','Кишинев', 'Копенгаген','Лиссабон','Лондон','Любляна','Люксембург','Мадрид','Монако', 'Москва', 'Осло', 'Париж', 'Подгорица','Прага','Рейкьявик'	,'Рига','Рим','Сан-Марино', 'Сараево','Скопье', 'София', 'Стокгольм', 'Таллинн','Тирана','Хельсинки']


export const CityGrid: FC = () => {
    const context = useContext(Context);
    const dispatch = useAppDispatch();
    const handleClick = (el: string) => (event: React.MouseEvent<HTMLElement>) => {
        dispatch(setCity(el));
        window.scrollTo(0, 0)
    }
    return (

        <div className="wrapper__container cityGrid">
            {cities.map((el: string, index:number) => (
                <Link className={`cityGrid__item cityGrid__item-${context.theme}`} to={`/${el}/0`} onClick={handleClick(el)} key={index}>{el}</Link>
            ))}
        </div>

    );
};
