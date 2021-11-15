import { createSlice } from "@reduxjs/toolkit";

interface State {
   loggedIn: boolean,
   user:{
    email: string | null;
    familyName: string | null;
    givenName: string | null;
    imageUrl: string | null;
    name: string | null;

  }
}

const initialState: State = {
    loggedIn: false,
    user:{
        email: null,
        familyName: null,
        givenName: null,
        imageUrl: null,
        name: null,
    }
 
}


const userSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
   
    setLogin: (state, action) => {state.loggedIn = action.payload},
    setUser: (state, action) => {state.user = action.payload},
  }
});


export const { setLogin,setUser } =  userSlice.actions;
export default userSlice.reducer