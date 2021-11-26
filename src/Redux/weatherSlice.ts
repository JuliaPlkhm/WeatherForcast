import { createSlice } from "@reduxjs/toolkit";

interface State {
  coords: number[];
  city: string;
}

const initialState: State = {
  coords: [53.902284,27.561831],
  city: 'Минск',
 
}

const weatherSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCoords: (state, action)=> {state.coords = action.payload},
    setCity: (state, action)=> {state.city = action.payload},
    
  }
});

export const {setCoords, setCity} =  weatherSlice.actions;
export default weatherSlice.reducer
