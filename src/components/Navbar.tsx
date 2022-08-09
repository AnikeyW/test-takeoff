import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RouteNames } from '../routes';
import { authSlice } from '../store/reducers/authSlice';
import './Navbar.css'

const Navbar: FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.authSlice.isAuth)

   const logoutHandler = () => {
      dispatch(authSlice.actions.setIsAuth(false))
      navigate('/login')
   }
   return (
      <div className="navbar">
         {isAuth ?
            <>
               <div>Имя пользоваьтеля</div>
               <button onClick={logoutHandler}>выйти</button>
            </>
            :
            <>
               <Link to={RouteNames.LOGIN} >Login</Link>
            </>
         }
      </div>
   );
};

export default Navbar;