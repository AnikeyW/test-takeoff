import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from './reducers/authSlice'
import contactsSlice from './reducers/contactsSlice'
import loginSlice from './reducers/loginSlice'

const rootReducer = combineReducers({
   authSlice,
   contactsSlice,
   loginSlice
})

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']