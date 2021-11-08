import React, { useState, useEffect } from 'react'
import {
  YMaps,
  Map,
  SearchControl,
  GeolocationControl,
  Placemark,
} from "react-yandex-maps";
import { Props } from './type';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCoords, setCity } from "./weatherSlice";

const YandexMapComponent = ({city}:Props) => {
  // const [state, setState] = useState<(number[])>([53.902284, 27.561831]);
  const [loadMaps, setLoadMaps] = useState<any>();
  const coords = useAppSelector(state => state.map.coords);
  const dispatch = useAppDispatch();

  const onLoadMap = (ymaps: any) => {
    setLoadMaps(ymaps)
    ymaps.geocode(city)?.then((result: any) =>
      dispatch(setCoords(result.geoObjects.get(0).geometry.getCoordinates())))
  }
  
  useEffect(() => {
    if (loadMaps) {
      onLoadMap(loadMaps)
    };
  }, [city]);

return (
  <div>
    <YMaps
      query={{
        apikey: "d104022f-e6f6-4d01-8182-2d11337e478a",
      }} >
      <div>
        <Map
          state={{ center: coords, zoom: 5 }}
          height="600px"
          width="100%"
          onClick={(event: any) => {
            dispatch(setCoords(event.get('coords')))
          }}
          onLoad={onLoadMap}
          modules={["geocode"]} >

          <Placemark geometry={coords} />
          <SearchControl options={{ float: "right" }} />
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      </div>
    </YMaps>
  </div>
)
};

export default YandexMapComponent;