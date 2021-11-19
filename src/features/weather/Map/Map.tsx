import { useState, useEffect } from 'react'
import {
  YMaps,
  Map,
  GeolocationControl,
  Placemark,
} from "react-yandex-maps";
import { Props } from '../type';
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks';
import { setCoords} from "../../../Redux/weatherSlice";
import "./Map.style.css"

export const YandexMapComponent = (props:Props) => {
  const [loadMaps, setLoadMaps] = useState<any>();
  const coords = useAppSelector(state => state.map.coords);
  const dispatch = useAppDispatch();

  const onLoadMap = (ymaps: any) => {
    setLoadMaps(ymaps)
    ymaps.geocode(props.city)?.then((result: any) =>
      dispatch(setCoords(result.geoObjects.get(0).geometry.getCoordinates())))
  }
  
  useEffect(() => {
    if (loadMaps) {
      onLoadMap(loadMaps)
    };
  }, [props.city, loadMaps]);

return (
  <div className ="map-container">
    <YMaps
      query={{
        apikey: "d104022f-e6f6-4d01-8182-2d11337e478a",
      }} >
      <div>
        <Map
          state={{ center: coords, zoom: 15 }}
          height="600px"
          maxWidth="1200px"
          width= '100%'
          margin="auto"
          onClick={(event: any) => {
            dispatch(setCoords(event.get('coords')))
          }}
          onLoad={onLoadMap}
          modules={["geocode"]} >

          <Placemark geometry={coords} />
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      </div>
    </YMaps>
  </div>
)
};
