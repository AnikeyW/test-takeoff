import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';

const Login: FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const loginHandler = () => {
      dispatch(authSlice.actions.setIsAuth(true))
      navigate('/')
   }
   return (
      <div>
         login
         <button onClick={loginHandler}>Войти</button>
      </div>
   );
};

export default Login;