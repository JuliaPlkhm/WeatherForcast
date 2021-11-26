import { useState, useEffect } from 'react'
import {
  YMaps,
  Map,
  GeolocationControl,
  Placemark,
  YMapsApi,
  GeoObject
} from "react-yandex-maps";
import { Props } from '../../type';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { setCoords} from "../../Redux/weatherSlice";
import "./Map.style.css"

type Event ={
  get:(props:string)=>[number, number]
}
type Res ={
  geoObjects: typeof GeoObject
}

export const YandexMapComponent = (props:Props) => {
  const [loadMaps, setLoadMaps] = useState<YMapsApi>();
  const coords = useAppSelector(state => state.map.coords);
  const dispatch = useAppDispatch();

  const onLoadMap = (ymaps: YMapsApi) => {
    setLoadMaps(ymaps)
    if(ymaps.geocode){
      ymaps.geocode(props.city)?.then((result: any) =>{
        console.log(result)

        dispatch(setCoords(result.geoObjects.get(0).geometry.getCoordinates()))
      }
      )
    }
  
  }
  
  useEffect(() => {
    if (loadMaps) {
      onLoadMap(loadMaps)
    };
  }, [props.city, loadMaps]);

return (
  <div className ="wrapper__container mapContainer">
    <YMaps
      query={{
        apikey: "d104022f-e6f6-4d01-8182-2d11337e478a",
      }} >
      <div>
        <Map className ="mapContainer__map"
          state={{ center: coords, zoom: 15 }}
          
          onClick={(event: Event) => {
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
