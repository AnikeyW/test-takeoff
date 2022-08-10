import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../../models/contact";

interface ContactsState {
   contacts: IContact[];
   isLoading: boolean;
   error: string;
}

const initialState: ContactsState = {
   contacts: [],
   error: '',
   isLoading: false
}

export const contactsSlice = createSlice({
   name: 'contacts',
   initialState,
   reducers: {
      fetchContacts(state) {
         state.isLoading = true;
      },
      fetchContactsSuccess(state, action: PayloadAction<IContact[]>) {
         state.isLoading = false;
         state.contacts = action.payload;
         state.error = "";
      },
      fetchContactsError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      }
   }
})

export default contactsSlice.reducer;