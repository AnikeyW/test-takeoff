import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

interface UsersState {
   userEmail: string;
   isLoading: boolean;
   error: string;
}

const initialState: UsersState = {
   userEmail: "",
   error: '',
   isLoading: false
}

export const loginSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      fetchUsers(state) {
         state.isLoading = true;
      },
      setUserSuccess(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.userEmail = action.payload;
         state.error = "";
      },
      addUserSuccess(state) {
         state.isLoading = false;
         state.error = "";
      },
      fetchUsersError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      }
   }
})

export default loginSlice.reducer;