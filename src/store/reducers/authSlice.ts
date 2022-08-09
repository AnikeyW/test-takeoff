import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
   isAuth: boolean;
}

const initialState: AuthState = {
   isAuth: false
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsAuth(state, action: PayloadAction<boolean>) {
         state.isAuth = action.payload;
      }
   }
})

export default authSlice.reducer;