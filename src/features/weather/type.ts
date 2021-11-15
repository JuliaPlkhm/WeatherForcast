export interface Geo {
  country: { id: number; name: string } | null;
  district: unknown;
  locality: { id: number; name: string };
  province: { id: number; name: string }| null;
 
} 
export type Forecast = ForecastParts[] 

export interface HoursType {
  hour: string,
  icon: string,
  temp: number
}

export interface ForecastParts {
  date: string;
  hours: HoursType[]
  parts: {
    day_short: {
      temp: number,
      feels_like: number,
      icon: string,
      condition: string
    }
   
  };
}
export interface Fact {
  temp: number;
  icon: Icon;
}

export interface Coords {
  lat: number;
  lon: number;
}

export type Icon = string | null

export interface Props{
  city: string;
  
}
export interface PropsCard{
  forecast: ForecastParts | undefined;
  geo: Geo | undefined;
  fact: Fact | undefined;
  key: number;
  index: number

}
export interface PropsInfo{
  forecast: ForecastParts | undefined;
  geo: Geo | undefined;
  fact: Fact | undefined;
}

export type QuizParams = {
  id: string;
};

export interface IContext{
  toggleTheme():void;
  theme: string
}
