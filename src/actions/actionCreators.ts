
import axios from "axios";
import { IContact } from "../models/contact";
import { contactsSlice } from "../store/reducers/contactsSlice";
import { AppDispatch } from "../store/store";


export const getContacts = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(contactsSlice.actions.fetchContacts())
      const response = await axios.get<IContact[]>('contacts')
      dispatch(contactsSlice.actions.fetchContactsSuccess(response.data))
   } catch (error) {
      console.error(error);
      dispatch(contactsSlice.actions.fetchContactsError("Не удалось загрузить контакты!"))
   }
}

interface IAddContactData {
   name: string;
   lastname: string;
}

export const addContact = (data: IAddContactData) => async (dispatch: AppDispatch) => {
   try {
      dispatch(contactsSlice.actions.fetchContacts())
      await axios.post<IContact[]>('contacts', data)
      dispatch(getContacts())
   } catch (error) {
      console.error(error);
      dispatch(contactsSlice.actions.fetchContactsError("Не удалось добавить контакт!"))
   }
}

export const deleteContact = (id: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(contactsSlice.actions.fetchContacts())
      await axios.delete<IContact[]>(`contacts/${id}`)
      dispatch(getContacts())
   } catch (error) {
      console.error(error);
      dispatch(contactsSlice.actions.fetchContactsError("Не удалось удалить контакт!"))
   }
}

export const fetchEditContact = (id: string, data: IContact) => async (dispatch: AppDispatch) => {
   try {
      dispatch(contactsSlice.actions.fetchContacts())
      await axios.put<IContact[]>(`contacts/${id}`, data)
      dispatch(getContacts())
   } catch (error) {
      console.error(error);
      dispatch(contactsSlice.actions.fetchContactsError("Не удалось отредактировать контакт!"))
   }
}