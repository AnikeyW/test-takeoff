import { Button, Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';
import { loginSlice } from '../store/reducers/loginSlice';

const Navbar: FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const isAuth = useAppSelector(state => state.authSlice.isAuth)
   const userEmail = useAppSelector(state => state.loginSlice.userEmail)

   const logoutHandler = () => {
      dispatch(loginSlice.actions.setUserSuccess(""))
      dispatch(authSlice.actions.setIsAuth(false))
      navigate('/login')
   }
   return (
      <Header>
         <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div style={{
               display: 'flex',
               justifyContent: 'flex-end',
               maxWidth: '1200px', width: '100%', height: '100%'
            }}>
               {isAuth &&
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                     <div style={{ color: '#fff', fontSize: '24px', marginRight: '5px' }}>{userEmail}</div>
                     <Button onClick={logoutHandler} type="primary">Выйти</Button>
                  </div>

               }
            </div>
         </div>
      </Header>
   );
};

export default Navbar;