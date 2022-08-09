import React, { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Contacts from '../pages/Contacts';
import Login from '../pages/Login';

const AppRouter: FC = () => {
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.authSlice.isAuth)
   useEffect(() => {
      if (isAuth) {
         navigate('/')
      } else {
         navigate('/login')
      }
   }, [])
   return (
      <Routes>
         {isAuth && <Route path='/' element={<Contacts />} />}
         <Route path='/login' element={<Login />} />
         <Route path='*' element={<Login />} />
      </Routes>
   );
};

export default AppRouter;