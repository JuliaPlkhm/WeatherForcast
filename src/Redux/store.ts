import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {weatherApi} from '../api/weatherAPI'
import map from './weatherSlice'
import login from './UserSlice'



export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    map,
    login,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);

// const unknown: number = 44

// const num = unknown as number | string;
// const num2: number | string  = unknown;

// type StringOrNumber = typeof num;


// console.log(num2 as StringOrNumber);


// type Func = (params: StringOrNumber) => [string, [number, number]];
// const func: Func = function passParam(paramt) {
//   return ["", [+paramt]];
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
